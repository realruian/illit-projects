"""把 src/data.json、Jost 字体和标志填进 src/template.html，生成 dist/ILLIT-实体唱片收藏图鉴.html。

用法：在 album-catalog 目录里运行  python3 src/assemble.py
"""
import base64
from pathlib import Path

root = Path(__file__).resolve().parent.parent
src = root / "src"
template = (src / "template.html").read_text(encoding="utf-8")
data = (src / "data.json").read_text(encoding="utf-8").replace("</", "<\\/")
font = base64.b64encode((src / "jost-latin.woff2").read_bytes()).decode("ascii")
logo = base64.b64encode((src / "illit-logo.png").read_bytes()).decode("ascii")
html = (template.replace("/*DATA*/", data)
        .replace("/*JOST*/", "data:font/woff2;base64," + font)
        .replace("/*LOGO*/", "data:image/png;base64," + logo))
out = root / "dist" / "ILLIT-实体唱片收藏图鉴.html"
out.write_text(html, encoding="utf-8")
print(f"Built {out.relative_to(root)} ({out.stat().st_size} bytes)")
