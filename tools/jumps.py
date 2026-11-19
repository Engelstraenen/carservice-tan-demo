#!/usr/bin/env python3
"""Bild-zu-Bild-Abweichung eines Videos messen (findet Morph/Überblendung, die ffmpeg-Schnittsuche übersieht).
Aufruf: python3 tools/jumps.py film.mp4   → größte Sprünge (Sekunde, Abweichung 0-255) + Median"""
import subprocess, sys, glob, os, tempfile, statistics
from PIL import Image, ImageChops, ImageStat
f = sys.argv[1]; d = tempfile.mkdtemp()
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f, '-vf', 'fps=4,scale=160:90', os.path.join(d, 'f_%03d.png')])
fs = sorted(glob.glob(os.path.join(d, 'f_*.png'))); prev = None; out = []
for i, p in enumerate(fs):
    im = Image.open(p).convert('L')
    if prev: out.append((round(i / 4, 2), round(ImageStat.Stat(ImageChops.difference(im, prev)).mean[0], 1)))
    prev = im
med = statistics.median(v for _, v in out)
print(os.path.basename(f), 'Median', med, '| größte Sprünge:', sorted(out, key=lambda x: -x[1])[:5])
