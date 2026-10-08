"""Mede a fluidez de um vídeo: frames parados, maior trecho parado e cortes secos.

    python3 films/mma-teaser-15s/fluidez.py out/mma-teaser-15s.mp4

Lê o vídeo em tons de cinza (270x480) e calcula a diferença média absoluta entre frames
consecutivos, de 0 a 255. Um frame é "parado" quando muda menos que LIMIAR_PARADO em relação ao
anterior; um "corte seco" é um salto acima de LIMIAR_CORTE que também é 5x maior que a vizinhança.
Os dois limiares foram calibrados no teaser reprovado (resultados/01-teaser-mma.mp4), em que esta
medição reproduz os números do cliente: 64,9% de frames parados, trecho de 1,40 s e 4 cortes secos.
O "hold final" é o trecho parado que encosta no último frame; ele é contado à parte.
"""

import argparse
import subprocess
import sys

import numpy as np

LIMIAR_PARADO = 0.2
LIMIAR_CORTE = 40.0
METAS = {"parados": 25.0, "trecho": 0.7, "hold": 1.0, "cortes": 0}

parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
parser.add_argument("video")
parser.add_argument("--fps", type=float, default=30)
args = parser.parse_args()

bruto = subprocess.run(["ffmpeg", "-v", "error", "-i", args.video, "-vf", "scale=270:480", "-f", "rawvideo",
                        "-pix_fmt", "gray", "-"], capture_output=True, check=True).stdout
frames = np.frombuffer(bruto, np.uint8).reshape(-1, 480, 270).astype(np.float32)
dif = np.abs(np.diff(frames, axis=0)).mean(axis=(1, 2))  # dif[i]: frame i+1 contra o frame i
parado = dif < LIMIAR_PARADO

trechos = []  # (início, fim) em índices de dif
inicio = None
for i, p in enumerate(np.append(parado, False)):
    if p and inicio is None:
        inicio = i
    elif not p and inicio is not None:
        trechos.append((inicio, i))
        inicio = None
hold = trechos.pop() if trechos and trechos[-1][1] == len(dif) else (len(dif), len(dif))
n_hold = hold[1] - hold[0]

cortes = []
for i, d in enumerate(dif):
    vizinhos = np.concatenate([dif[max(i - 6, 0) : max(i - 1, 0)], dif[i + 2 : i + 7]])
    if d > LIMIAR_CORTE and d > 5 * max(np.median(vizinhos) if len(vizinhos) else 0, 1e-6):
        cortes.append(i + 1)

pct = parado[: hold[0]].sum() / hold[0] * 100 if hold[0] else 0.0
maior = max(trechos, key=lambda r: r[1] - r[0], default=(0, 0))
maior_s = (maior[1] - maior[0]) / args.fps
hold_s = n_hold / args.fps

ok = {"parados": pct <= METAS["parados"], "trecho": maior_s <= METAS["trecho"],
      "hold": hold_s <= METAS["hold"], "cortes": len(cortes) <= METAS["cortes"]}
marca = lambda k: "ok" if ok[k] else "FORA DA META"
print(f"{args.video}: {len(frames)} frames, diferença média por frame {dif.mean():.2f}")
print(f"  frames parados (sem o hold final): {pct:.1f}%   meta ≤ {METAS['parados']:.0f}%   {marca('parados')}")
print(f"  maior trecho parado: {maior_s:.2f} s (frames {maior[0] + 1}–{maior[1]})   meta ≤ {METAS['trecho']} s   {marca('trecho')}")
print(f"  hold final: {hold_s:.2f} s   meta ≤ {METAS['hold']} s   {marca('hold')}")
print(f"  cortes secos: {len(cortes)}{' (frames ' + ', '.join(map(str, cortes)) + ')' if cortes else ''}   meta 0   {marca('cortes')}")
outros = sorted(trechos, key=lambda r: r[0] - r[1])[:4]
if outros:
    print("  trechos parados mais longos: " + ", ".join(f"{(b - a) / args.fps:.2f} s em {(a + 1) / args.fps:.2f} s" for a, b in outros))
sys.exit(0 if all(ok.values()) else 1)
