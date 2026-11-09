#!/usr/bin/env python3
"""Extract a clean widescreen architectural backdrop from an editorial image concept.

The concept image contains mock webpage elements. We crop ONLY the clean right-side
architecture, build a wide gradient canvas, and feather the photo into the backdrop.
Never deploy the original source as the page background: it has baked-in UI text.
The result is decorative concept art, not a photograph of an Illipe office.
"""
from pathlib import Path
from PIL import Image, ImageDraw
from PIL import ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "design" / "illipe-hero-source-generated.png"
OUTPUT = ROOT / "assets" / "illipe-hero-wide.webp"

def smoothstep(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3.0 - 2.0 * t)

def main():
    im = Image.open(SOURCE).convert("RGB")
    w, h = im.size
    assert w >= 1400 and h >= 800, f"Unexpected image dimensions: {w}x{h}"
    # Skip baked-in page title, navigation, and bottom feature panel entirely.
    clean = im.crop((round(w * .46), round(h * .137), w, round(h * .777)))
    W, H = 1600, 760
    canvas = Image.new("RGB", (W, H), (9, 19, 33))
    draw = ImageDraw.Draw(canvas)
    for y in range(H):
        t = y / (H - 1)
        c = (round(9 + t * 5), round(21 + t * 5), round(37 + t * 5))
        draw.line((0, y, W, y), fill=c)
    photo = ImageOps.fit(clean, (1120, H), method=Image.Resampling.LANCZOS, centering=(.5, .5))
    # Blend the photographic architecture into a clean navy field for live HTML copy.
    mask = Image.new("L", photo.size, 0)
    brush = ImageDraw.Draw(mask)
    for x in range(photo.width):
        alpha = round(255 * smoothstep((x - 35) / 440))
        brush.line((x, 0, x, H), fill=alpha)
    canvas.paste(photo, (480, 0), mask)
    # Quiet dark overlay for contrast on the far-left edge without hiding the building.
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    for x in range(0, 940):
        a = round(68 * (1 - smoothstep((x - 240) / 700)))
        odraw.line((x, 0, x, H), fill=(4, 11, 22, a))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay).convert("RGB")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUTPUT, "WEBP", quality=86, method=6)
    print(f"Generated {OUTPUT.relative_to(ROOT)} {W}x{H}, {OUTPUT.stat().st_size} bytes from {w}x{h} source")

if __name__ == "__main__":
    main()
