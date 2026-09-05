from rembg import remove
from pathlib import Path

dogs_dir = Path(r"C:\Users\alpho\OneDrive\Desktop\Crosspoint New Website Build 2026\website\images\dogs")

jobs = [
    ("Mila.jpg",     "mila-cutout.png"),
    ("IMG_0278.jpg", "adidas-cutout.png"),
    ("IMG_0374.jpg", "img-0374-cutout.png"),
    ("IMG_0375.jpg", "img-0375-cutout.png"),
]

for src_name, dst_name in jobs:
    src = dogs_dir / src_name
    dst = dogs_dir / dst_name
    print(f"Processing {src_name}...", flush=True)
    with open(src, "rb") as f:
        data = f.read()
    output = remove(data)
    with open(dst, "wb") as f:
        f.write(output)
    print(f"  -> {dst_name}  ({dst.stat().st_size // 1024} KB)", flush=True)

print("DONE", flush=True)
