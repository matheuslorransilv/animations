"""Trilha do teaser MMA da TEAM NOGUEIRA, sintetizada em código: 120 BPM, 10 s.

    python3 films/mma-teaser/score.py

Grava score.wav, mede o grid com o beats.py da raiz (-> beats.json) e grava beats.js,
que o filme carrega (em file:// a página não consegue ler o JSON diretamente).
A 120 BPM um beat dura 0,5 s, então os cortes do roteiro (2,0 · 4,5 · 7,5 s) caem no grid.
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
SR, BPM, DUR, FPS = 48000, 120, 10.0, 30
BEAT = 60 / BPM
N = int(SR * DUR)
rng = np.random.default_rng(14_10_2026)  # semente fixa: o mesmo arquivo a cada execução
mix = np.zeros(N)


def b(i):
    return i * BEAT


def tempo(dur):
    return np.arange(int(dur * SR)) / SR


def soma(som, t, ganho=1.0):
    i = int(round(t * SR))
    j = min(N, i + len(som))
    if 0 <= i < N:
        mix[i:j] += ganho * som[: j - i]


def filtro(x, tipo, freq, ordem=2):
    return signal.sosfilt(signal.butter(ordem, freq, tipo, fs=SR, output="sos"), x)


def varredura(x, f0, f1, blocos=64):
    """Passa-baixa com corte subindo de f0 a f1 (exponencial), bloco a bloco."""
    saida = np.zeros_like(x)
    bordas = np.linspace(0, len(x), blocos + 1).astype(int)
    zi = None
    for k in range(blocos):
        sos = signal.butter(2, f0 * (f1 / f0) ** (k / (blocos - 1)), "lowpass", fs=SR, output="sos")
        if zi is None:
            zi = np.zeros((sos.shape[0], 2))
        saida[bordas[k] : bordas[k + 1]], zi = signal.sosfilt(sos, x[bordas[k] : bordas[k + 1]], zi=zi)
    return saida


def oscilador(freq_por_amostra):
    return 2 * np.pi * np.cumsum(freq_por_amostra) / SR


def bumbo():
    t = tempo(0.42)
    corpo = np.sin(oscilador(48 + 120 * np.exp(-t * 30))) * np.exp(-t * 7.5)
    clique = filtro(rng.standard_normal(len(t)), "highpass", 2500) * np.exp(-t * 300) * 0.35
    return np.tanh(2.0 * corpo + clique)


def golpe():
    """Soco seco que acompanha cada slam de texto."""
    t = tempo(0.22)
    tapa = filtro(rng.standard_normal(len(t)), "bandpass", [900, 5000]) * np.exp(-t * 32)
    soco = np.sin(oscilador(70 + 180 * np.exp(-t * 18))) * np.exp(-t * 20)
    return np.tanh(1.5 * (0.8 * tapa + 0.7 * soco))


def impacto(dur=1.8):
    """Impacto grave: queda de 127 Hz para 32 Hz com estalo."""
    t = tempo(dur)
    boom = np.sin(oscilador(32 + 95 * np.exp(-t * 5))) * np.exp(-t * 2.0)
    estalo = filtro(rng.standard_normal(len(t)), "lowpass", 3000) * np.exp(-t * 14)
    return np.tanh(2.4 * boom + 0.6 * estalo)


def whoosh(dur):
    """Ruído abrindo de 400 Hz a 7 kHz e crescendo até o corte."""
    t = tempo(dur)
    x = t / dur
    ar = filtro(varredura(rng.standard_normal(len(t)), 400, 7000), "highpass", 200)
    return ar * x**2.5


def riser(dur):
    """Subida curta: serra de 220 a 880 Hz + ruído abrindo."""
    t = tempo(dur)
    x = t / dur
    tom = filtro(signal.sawtooth(oscilador(220 * 4**x)), "lowpass", 3000)
    ar = varredura(rng.standard_normal(len(t)), 500, 9000)
    return (0.35 * tom + 0.6 * ar) * x**2


def baixo(freq, dur):
    t = tempo(dur)
    onda = filtro(signal.sawtooth(2 * np.pi * freq * t), "lowpass", 500)
    return np.tanh(2.5 * onda * np.minimum(1, t / 0.005) * np.exp(-t * 6))


def chimbal():
    t = tempo(0.04)
    return filtro(rng.standard_normal(len(t)), "highpass", 7000) * np.exp(-t * 120)


# Arranjo (índices de beat; 20 beats = 5 compassos de 2 s)
NOTA = {"E2": 82.41, "F2": 87.31, "G2": 98.00}
RAIZ_DO_COMPASSO = ["E2", "E2", "G2", "F2", "E2"]

for i in range(20):
    soma(bumbo(), b(i), 0.9)
    contratempo = b(i) + BEAT / 2
    if not b(15) <= contratempo < b(16):  # o baixo some durante o riser
        soma(baixo(NOTA[RAIZ_DO_COMPASSO[i // 4]], BEAT / 2), contratempo, 0.45)

for i in range(4, 15):  # semicolcheias nas cenas de impacto e data
    for k in (1, 2, 3):
        soma(chimbal(), b(i) + k * BEAT / 4, 0.12 if k == 2 else 0.07)
for i in range(16, 20):
    soma(chimbal(), b(i) + BEAT / 2, 0.12)

for i, ganho in {0: 0.8, 1: 0.7, 2: 0.9, 9: 0.8, 10: 0.6, 12: 0.7, 15: 0.8, 16: 0.9, 17: 0.5, 18: 0.6}.items():
    soma(golpe(), b(i), ganho)  # slams, cortes e entradas do filme

soma(whoosh(0.3), b(4) - 0.3, 0.6)  # wipe diagonal (300 ms) chegando ao centro no beat 4
soma(impacto(), b(4), 1.0)  # corte branco
soma(riser(BEAT), b(15), 0.5)  # antes de "QUEM É ELE?"
soma(impacto(1.2), b(16), 0.7)  # "QUEM É ELE?"

mix[-int(0.005 * SR) :] *= np.linspace(1, 0, int(0.005 * SR))  # tira o clique do corte final


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


# Master em -14 LUFS com true peak em -2 dBTP: o render.mjs só confere, e a folga cobre o AAC.
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

subprocess.run([sys.executable, str(RAIZ / "beats.py"), str(wav)], check=True)
medido = json.loads((AQUI / "beats.json").read_text())

# O librosa marca cada beat 20–40 ms depois do ataque (hops de 23 ms sobre a envoltória de onsets).
# Cada beat medido é refinado até o ataque real: a subida mais rápida da envoltória (1 ms) na janela
# de 80 ms antes dele. O beats.json fica como o beats.py gravou; o filme usa os beats refinados.
envoltoria = np.convolve(np.abs(mix), np.ones(48) / 48, mode="same")


def ataque(t):
    i0, i1 = max(int((t - 0.08) * SR), 0), int((t + 0.01) * SR)
    return (i0 + int(np.argmax(np.diff(envoltoria[i0:i1])))) / SR


medidos = medido["beats"][:20]
refinados = [round(ataque(t), 4) for t in medidos]
desvio = max(abs(r - b(i)) for i, r in enumerate(refinados))
if len(medidos) < 20 or desvio > 0.5 / FPS:
    sys.exit(f"grid medido não bate com o desenhado (desvio {desvio * 1000:.0f} ms):\n  {refinados}")
print(f"grid conferido: {len(medidos)} beats medidos ({medido['tempo']} BPM pelo librosa), "
      f"ataques a no máx. {desvio * 1000:.1f} ms do grid de {BPM} BPM")

(AQUI / "beats.js").write_text(
    "// Gerado por score.py: beats do beats.json (medidos pelo beats.py) refinados até o ataque. Não editar.\n"
    f"window.BEATS = {json.dumps({'fonte': 'beats.json', 'tempo': medido['tempo'], 'medidos': medidos, 'beats': refinados})};\n"
)
