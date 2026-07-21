from collections import defaultdict
from pathlib import Path
from PIL import Image


SRC = Path("/var/folders/mj/2v3_x6x12fxgfx18_7836qmr0000gn/T/TemporaryItems/NSIRD_screencaptureui_50Bueo/Screenshot 2026-07-02 at 11.04.43.png")
OUT = Path("/Users/anton/Documents/Codex/2026-07-02/dg/outputs")


def is_eye_pixel(r, g, b, a):
    if a == 0:
        return False
    # The eye crop contains only the eyes on a white background.
    return r < 245 and g < 245 and b < 245


def is_orange_pixel(r, g, b, a):
    if a == 0:
        return False
    # Captures the orange marker strokes and their antialiasing while excluding text.
    return r > 120 and 35 < g < 205 and b < 150 and r > g + 18 and r > b + 45


def rect_path_for_runs(runs):
    parts = []
    for y, x0, x1 in runs:
        w = x1 - x0 + 1
        parts.append(f"M{x0} {y}h{w}v1H{x0}z")
    return "".join(parts)


def vectorize(name, crop, predicate):
    img = Image.open(SRC).convert("RGBA")
    left, top, right, bottom = crop
    width = right - left + 1
    height = bottom - top + 1
    pixels = img.load()

    grouped_runs = defaultdict(list)
    for y in range(top, bottom + 1):
        x = left
        while x <= right:
            color = pixels[x, y]
            if not predicate(*color):
                x += 1
                continue

            x0 = x
            while x + 1 <= right and pixels[x + 1, y] == color and predicate(*pixels[x + 1, y]):
                x += 1
            grouped_runs[color].append((y - top, x0 - left, x - left))
            x += 1

    paths = []
    for (r, g, b, a), runs in sorted(grouped_runs.items(), key=lambda item: (-len(item[1]), item[0])):
        opacity = a / 255
        attrs = f'fill="rgb({r},{g},{b})"'
        if opacity < 1:
            attrs += f' fill-opacity="{opacity:.4f}"'
        paths.append(f'  <path {attrs} d="{rect_path_for_runs(runs)}"/>\n')

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}" shape-rendering="crispEdges">\n'
        f'<title>{name}</title>\n'
        + "".join(paths)
        + "</svg>\n"
    )

    path = OUT / f"{name}.svg"
    path.write_text(svg, encoding="utf-8")
    return path, width, height, sum(len(v) for v in grouped_runs.values()), len(grouped_runs)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    specs = [
        ("eyes-vector", (52, 66, 184, 131), is_eye_pixel),
        ("heart-vector", (441, 222, 502, 318), is_orange_pixel),
        ("lines-vector", (642, 90, 772, 220), is_orange_pixel),
    ]
    for spec in specs:
        path, width, height, runs, colors = vectorize(*spec)
        print(f"{path} {width}x{height} runs={runs} colors={colors}")


if __name__ == "__main__":
    main()
