# ILLIT 个人项目合集

这里放和 ILLIT 相关的个人网页与小工具，每个项目一个文件夹，互不依赖。

线上地址（GitHub Pages）：

- 入口：https://realruian.github.io/illit-projects/
- 专辑图鉴：https://realruian.github.io/illit-projects/album-catalog/
- 学习指南：https://realruian.github.io/illit-projects/study-guide/

推送到 `main` 后，`.github/workflows/pages.yml` 会自动构建并测试两个项目，然后部署。入口页源码在 `site/index.html`。

| 文件夹 | 项目 | 怎么看成品 | 怎么修改 |
|---|---|---|---|
| [album-catalog/](album-catalog/) | ILLIT 实体专辑与版本图鉴 | 双击 `album-catalog/dist/ILLIT-实体唱片收藏图鉴.html` | 改 `src/data.json` 或 `src/template.html`，再运行 `python3 src/assemble.py` |
| [study-guide/](study-guide/) | ILLIT 个人互动追星学习指南（五关学习站） | 运行 `npm run build` 后打开 `study-guide/dist/index.html`；线上版见该项目 README | 改源码后运行 `npm run build` 和 `npm test`；首次使用先运行 `npm ci` |

各项目的详细说明：

- 专辑图鉴：[album-catalog/打开与查证说明.md](album-catalog/打开与查证说明.md)
- 学习指南：[study-guide/README.md](study-guide/README.md)

## 新增项目

1. 在这里新建一个文件夹，名字用小写英文加连字符，例如 `photocard-tracker/`。
2. 源码放进去，并写一份它自己的 README。
3. 在上面的表格里加一行。

## 不进 git 的内容

- `node_modules/`
- 构建产物：`study-guide/dist/`、`study-guide/downloads/`
- 大体积原图：`album-catalog/raw/`

具体规则见 `.gitignore` 和各项目自己的 `.gitignore`。

## 版权提醒

两个项目都用了 BELIFT LAB、HYBE、Weverse、环球音乐等权利人的官方图片，属于个人粉丝用途的非商业项目。图片版权归原权利人所有，本仓库不主张任何图片权利；权利人如有异议，会立即移除相关图片。
