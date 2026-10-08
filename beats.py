"""Measure the beat grid of an audio track and write beats.json (see CLAUDE.md).

    python3 beats.py films/intro/score.wav          -> films/intro/beats.json
    python3 beats.py track.mp3 -o films/intro/beats.json
"""

import argparse
import json
import pathlib

import librosa
import numpy as np

parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
parser.add_argument("audio")
parser.add_argument("-o", "--out", help="defaults to beats.json next to the audio file")
args = parser.parse_args()

y, sr = librosa.load(args.audio, sr=22050, mono=True)
tempo, beats = librosa.beat.beat_track(y=y, sr=sr, units="time", trim=False)
onsets = librosa.onset.onset_detect(y=y, sr=sr, units="time")

data = {
    "source": pathlib.Path(args.audio).name,
    "duration": round(len(y) / sr, 3),
    "tempo": round(float(np.atleast_1d(tempo)[0]), 2),
    "beats": [round(float(t), 3) for t in beats],
    "onsets": [round(float(t), 3) for t in onsets],
}
out = pathlib.Path(args.out) if args.out else pathlib.Path(args.audio).with_name("beats.json")
out.write_text(json.dumps(data, indent=2) + "\n")
print(f"{out}: {data['tempo']} BPM, {len(data['beats'])} beats, {len(data['onsets'])} onsets over {data['duration']}s")
