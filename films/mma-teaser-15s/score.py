"""Trilha do teaser MMA de 15 s (TEAM NOGUEIRA), sintetizada em código: 120 BPM, primeiro beat em 0,2 s.

    python3 films/mma-teaser-15s/score.py

Grava score.wav (masterizado em -14 LUFS / -2 dBTP), mede o grid com o beats.py da raiz
(-> beats.json), refina cada beat medido até o ataque e grava beats.js para o filme.
Os eventos (whooshes, impactos, ticks, riser) seguem o mesmo roteiro do index.html.
"""

import json
import pathlib
import re
import subprocess
import sys

import numpy as np
import soundfile as sf
from scipy import ndimage, signal

AQUI = pathlib.Path(__file__).resolve().parent
RAIZ = AQUI.parents[1]
SR, BPM, DUR, FPS = 48000, 120, 15.0, 30
BEAT = 60 / BPM
INICIO = 0.2  # primeiro beat: o golpe do "UFC." (beat 2) cai em 1,2 s
N = int(SR * DUR)
rng = np.random.default_rng(14_10_2026)
mix = np.zeros(N)


def b(i):
    return INICIO + i * BEAT


def tempo(dur):
    return np.arange(int(dur * SR)) / SR


def soma(som, t, ganho=1.0):
    i = int(round(t * SR))
    j = min(N, i + len(som))
    if 0 <= i < N:
        mix[i:j] += ganho * som[: j - i]


def filtro(x, tipo, freq, ordem=2):
    return signal.sosfilt(signal.butter(ordem, freq, tipo, fs=SR, output="sos"), x)


def varredura(x, cortes, blocos=64):
    """Passa-baixa cujo corte segue a curva `cortes` (Hz, um valor por bloco)."""
    saida = np.zeros_like(x)
    bordas = np.linspace(0, len(x), blocos + 1).astype(int)
    zi = None
    for k in range(blocos):
        sos = signal.butter(2, float(cortes[k]), "lowpass", fs=SR, output="sos")
        if zi is None:
            zi = np.zeros((sos.shape[0], 2))
        saida[bordas[k] : bordas[k + 1]], zi = signal.sosfilt(sos, x[bordas[k] : bordas[k + 1]], zi=zi)
    return saida


def oscilador(freq_por_amostra):
    return 2 * np.pi * np.cumsum(freq_por_amostra) / SR


# Easing-saida lido do tokens.css (mesma curva do filme), para pôr os ticks onde a rolagem passa.
_tokens = (RAIZ / "design-system" / "tokens.css").read_text()
X1, Y1, X2, Y2 = map(float, re.search(r"--tn-movimento-proposta-easing-saida:\s*cubic-bezier\(([^)]*)\)", _tokens).group(1).split(","))


def saida_inversa(y):
    """Tempo normalizado em que o easing-saida atinge o progresso y."""
    u = np.linspace(0, 1, 20001)
    bx = 3 * X1 * u * (1 - u) ** 2 + 3 * X2 * u**2 * (1 - u) + u**3
    by = 3 * Y1 * u * (1 - u) ** 2 + 3 * Y2 * u**2 * (1 - u) + u**3
    return float(np.interp(y, by, bx))


# ---- sons ----------------------------------------------------------------------------------

def bumbo_suave():
    t = tempo(0.5)
    corpo = np.sin(oscilador(44 + 70 * np.exp(-t * 26))) * np.exp(-t * 6.5)
    clique = filtro(rng.standard_normal(len(t)), "bandpass", [1500, 6000]) * np.exp(-t * 260) * 0.18
    return np.tanh(1.6 * corpo + clique)


def impacto(dur=1.6):
    t = tempo(dur)
    boom = np.sin(oscilador(30 + 100 * np.exp(-t * 5))) * np.exp(-t * 2.2)
    estalo = filtro(rng.standard_normal(len(t)), "lowpass", 3500) * np.exp(-t * 16)
    return np.tanh(2.4 * boom + 0.7 * estalo)


def whoosh(dur):
    """Ruído que abre e fecha, com o pico a 60% da duração."""
    t = tempo(dur)
    x = t / dur
    forma = np.sin(np.pi * np.minimum(x / 0.6, 1) / 2) * np.where(x < 0.6, 1, np.cos(np.pi * (x - 0.6) / 0.8))
    cortes = 500 + 6500 * np.interp(np.linspace(0, 1, 64), x, np.clip(forma, 0, 1))
    return filtro(varredura(rng.standard_normal(len(t)), cortes), "highpass", 250) * np.clip(forma, 0, 1) ** 1.5


def tick():
    t = tempo(0.03)
    return filtro(rng.standard_normal(len(t)), "bandpass", [2500, 7000]) * np.exp(-t * 220) + \
        0.4 * np.sin(2 * np.pi * 1800 * t) * np.exp(-t * 300)


def riser(dur):
    t = tempo(dur)
    x = t / dur
    tom = filtro(signal.sawtooth(oscilador(110 * 8**x)), "lowpass", 4000)
    ar = varredura(rng.standard_normal(len(t)), 400 * 25 ** np.linspace(0, 1, 64))
    return (0.35 * tom + 0.6 * ar) * x**2


def chimbal():
    t = tempo(0.035)
    return filtro(rng.standard_normal(len(t)), "highpass", 8000) * np.exp(-t * 140)


def pad(notas, dur, ataque=0.25, soltura=0.25):
    """Pad grave: três serras levemente desafinadas por nota, passa-baixa que respira devagar."""
    t = tempo(dur)
    voz = sum(signal.sawtooth(2 * np.pi * f * d * t + rng.uniform(0, 2 * np.pi))
              for f in notas for d in (0.996, 1.0, 1.004))
    voz = varredura(voz / (3 * len(notas)), 500 + 350 * np.sin(np.linspace(0, np.pi, 64)))
    env = np.minimum(1, t / ataque) * np.minimum(1, (dur - t) / soltura)
    return voz * env


# ---- arranjo (mesmo roteiro do index.html) ---------------------------------------------------

NOTA = {"A1": 55.0, "C2": 65.41, "D2": 73.42, "E2": 82.41, "F2": 87.31, "G#2": 103.83, "A2": 110.0,
        "B2": 123.47, "C3": 130.81, "E3": 164.81}
ACORDES = [  # (início, fim, notas): Am · F · Dm · E · Am, trocando nos beats de cada ato
    (0.0, b(6), ["A1", "C2", "E2", "A2"]),
    (b(6), b(14), ["F2", "A2", "C3"]),
    (b(14), b(23), ["D2", "F2", "A2"]),
    (b(23), b(26), ["E2", "G#2", "B2"]),
    (b(26), DUR, ["A1", "E2", "A2", "C3"]),
]
camada_pad = np.zeros(N)
for ini, fim, notas in ACORDES:
    som = pad([NOTA[n] for n in notas], fim - ini + 0.25, ataque=0.25 if ini else 0.05)
    i = int(ini * SR)
    j = min(N, i + len(som))
    camada_pad[i:j] += som[: j - i]
bombeio = np.ones(N)  # o pad abaixa um pouco a cada bumbo
for i in range(30):
    k = int(b(i) * SR)
    curva = 1 - 0.35 * np.exp(-tempo(0.35) * 9)
    bombeio[k : k + len(curva)] = np.minimum(bombeio[k : k + len(curva)], curva[: N - k])
mix += 0.55 * camada_pad * bombeio

for i in range(30):
    soma(bumbo_suave(), b(i), 0.8)
for i in list(range(6, 15)) + list(range(23, 29)):  # contratempo leve nos atos 2 e 4
    soma(chimbal(), b(i) + BEAT / 2, 0.08)

GOLPES = [2, 14, 25]  # "UFC.", trava do contador, trava do "14/10"
for i in GOLPES:
    soma(impacto(), b(i), 0.9)

TRANSICOES = [b(3) - 0.1, b(5) + 0.25, b(8) - 0.05, b(10) - 0.05, b(12) + 0.15, b(15) - 0.1,
              b(17) - 0.1, b(20) - 0.45, b(20) - 0.1, b(23) - 0.25, b(26)]  # mesmas saídas e wipes do index.html
for t in TRANSICOES:
    soma(whoosh(0.45), t, 0.55)

soma(riser(1.0), b(23) - 1.0, 0.55)  # 1 s antes do ato 4

# Contador: três passos que travam no beat 14; cada passo começa com um tick.
PASSOS_CONTADOR = [0.48, 0.32, 0.16]  # segundos antes da trava
for antes in PASSOS_CONTADOR:
    soma(tick(), b(14) - antes, 0.5)
# "14/10": quatro colunas rolam 6 dígitos cada até travar no beat 25 (escalonadas em 40 ms).
ROLAGEM_DIGITOS, ESCALONA = 6, 0.04
for c in range(4):
    ini, fim = b(24) + c * ESCALONA, b(25)
    for k in range(1, ROLAGEM_DIGITOS + 1):
        soma(tick(), ini + (fim - ini) * saida_inversa((k - 0.5) / ROLAGEM_DIGITOS), 0.22)

mix[-int(0.005 * SR) :] *= np.linspace(1, 0, int(0.005 * SR))  # tira o clique do corte final


# ---- master: -14 LUFS, true peak -2 dBTP -------------------------------------------------------

def mede(x):
    """LUFS integrado e true peak pelo ebur128 do ffmpeg, o mesmo medidor do render.mjs."""
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
                        "-af", "ebur128=peak=true:framelog=quiet", "-f", "null", "-"],
                       input=x.astype(np.float32).tobytes(), capture_output=True, check=True)
    saida = r.stderr.decode()
    return (float(re.findall(r"I:\s+(-?[\d.]+) LUFS", saida)[-1]), float(re.findall(r"Peak:\s+(-?[\d.]+) dBFS", saida)[-1]))


def limitador(x, teto_db, janela=0.005):
    """Limiter de true peak: 4x oversampling, lookahead de 5 ms, ganho suavizado sem passar do teto."""
    alto = signal.resample_poly(x, 4, 1)
    w = int(janela * SR * 4)
    ganho = np.minimum(1, 10 ** (teto_db / 20) / np.maximum(ndimage.maximum_filter1d(np.abs(alto), 2 * w + 1), 1e-9))
    return signal.resample_poly(alto * ndimage.uniform_filter1d(ganho, w), 1, 4)


ALVO_LUFS, TETO_DBTP = -14.0, -2.0
mix /= np.max(np.abs(mix))
for _ in range(8):
    lufs, _ = mede(limitador(mix, TETO_DBTP))
    if abs(lufs - ALVO_LUFS) < 0.05:
        break
    mix *= 10 ** ((ALVO_LUFS - lufs) / 20)
mix = limitador(mix, TETO_DBTP)

wav = AQUI / "score.wav"
sf.write(wav, mix.astype(np.float32), SR, subtype="PCM_24")
lufs, pico = mede(mix)
print(f"{wav.relative_to(RAIZ)}: {DUR:.0f} s, {BPM} BPM, {SR} Hz, {lufs:.1f} LUFS, true peak {pico:.1f} dBTP")

# ---- grid medido -----------------------------------------------------------------------------

subprocess.run([sys.executable, str(RAIZ / "beats.py"), str(wav)], check=True)
medido = json.loads((AQUI / "beats.json").read_text())

# O librosa marca cada beat 20–40 ms depois do ataque e, no fim da trilha, pode derivar até ~150 ms.
# Cada beat medido é refinado até o ataque real com um filtro casado: a posição, a até 150 ms dele,
# em que os graves da mixagem mais se parecem com o corpo do bumbo (impactos e whooshes por cima não
# deslocam o pico; o bumbo vizinho está a 500 ms, fora da janela).
graves = filtro(mix, "lowpass", 200)
_t = tempo(0.08)
corpo = np.sin(oscilador(44 + 70 * np.exp(-_t * 26))) * np.exp(-_t * 6.5)


def ataque(t):
    """Primeiro pico forte da correlação normalizada (>= 75% do máximo da janela): o ataque vem antes
    da cauda do impacto grave, que ressoa parecido com o bumbo e dá um pico maior ~130 ms depois."""
    i0, i1 = max(int((t - 0.15) * SR), 0), int((t + 0.15) * SR)
    trecho = graves[i0 : i1 + len(corpo)]
    energia = np.sqrt(np.convolve(trecho**2, np.ones(len(corpo)), mode="valid"))
    ncc = signal.correlate(trecho, corpo, mode="valid") / (np.maximum(energia, 1e-9) * np.linalg.norm(corpo))
    picos, _ = signal.find_peaks(ncc)
    fortes = picos[ncc[picos] >= 0.75 * ncc.max()]
    return (i0 + int(fortes[0] if len(fortes) else np.argmax(ncc))) / SR


# Casa cada beat desenhado com o beat medido mais próximo (o librosa pode pular ou somar um no fim).
medidos = np.array(medido["beats"])
pares = [medidos[np.argmin(np.abs(medidos - b(i)))] for i in range(30)]
refinados = [round(ataque(t), 4) for t in pares]
desvio = max(abs(r - b(i)) for i, r in enumerate(refinados))
if desvio > 0.5 / FPS or len(set(pares)) < 30:
    sys.exit(f"grid medido não bate com o desenhado (desvio {desvio * 1000:.0f} ms):\n  {refinados}")
print(f"grid conferido: {len(medidos)} beats medidos ({medido['tempo']} BPM pelo librosa), "
      f"30 ataques a no máx. {desvio * 1000:.1f} ms do grid de {BPM} BPM")

(AQUI / "beats.js").write_text(
    "// Gerado por score.py: beats do beats.json (medidos pelo beats.py) refinados até o ataque. Não editar.\n"
    f"window.BEATS = {json.dumps({'fonte': 'beats.json', 'tempo': medido['tempo'], 'beats': refinados})};\n"
)
