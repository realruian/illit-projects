"""把 src/data.json 填进 src/template.html，生成 dist/ILLIT-实体唱片收藏图鉴.html。

用法：在 album-catalog 目录里运行  python3 src/assemble.py
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent
template = (root / "src" / "template.html").read_text(encoding="utf-8")
data = (root / "src" / "data.json").read_text(encoding="utf-8").replace("</", "<\\/")
out = root / "dist" / "ILLIT-实体唱片收藏图鉴.html"
out.write_text(template.replace("/*DATA*/", data), encoding="utf-8")
print(f"Built {out.relative_to(root)} ({out.stat().st_size} bytes)")
