import sys
from PIL import Image
# usage: sheet.py out.png cols cellw cellh in1 in2 ...
out, cols, cw, ch = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
files = sys.argv[5:]
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * cw, rows * ch), (40, 40, 40))
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB')
    im.thumbnail((cw, ch))
    sheet.paste(im, ((i % cols) * cw, (i // cols) * ch))
sheet.save(out)
