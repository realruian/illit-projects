# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

主要用户是项目所有者本人：一位关注 ILLIT 全团的粉丝，购买实体专辑主要为了收藏写真、小卡等周边，同时在系统地入坑和了解团体。页面公开在 GitHub Pages 上，但公开只是顺便，不以陌生访客为设计对象。

## Product Purpose

一组和 ILLIT 相关的个人网页与小工具，放在同一个仓库里，各自独立：

- **album-catalog（实体专辑与版本图鉴）**：按发行时间核对 ILLIT 的全部实体作品和每个基础包装版本，弄清每款有什么内含物、哪些是随机的，并标记自己已拥有的版本。
- **study-guide（互动追星学习指南）**：五关中文讲解、成员档案、小工具、测验和笔记，帮助本人循序渐进地了解 ILLIT。
- **site（入口页）**：列出各项目的链接。

成功的标准是：本人能快速、准确地查到信息，并愿意反复回来使用。

## Positioning

资料以官方来源为准、逐项核实，并且写明统计口径和未核实的地方；不是通用的粉丝百科，也不追求覆盖面。

## Operating Context

- 手机和电脑都会用到。图鉴常用于购买或整理收藏时对照版本。
- 学习记录、已拥有标记都只保存在本人浏览器的 localStorage 里。
- 各项目都是可离线打开的静态 HTML，并通过 GitHub Pages 发布在 https://realruian.github.io/illit-projects/。

## Capabilities and Constraints

- 纯静态页面，没有后端，也没有运行时依赖。图鉴由 `album-catalog/src/` 里的模板和 `data.json` 组装生成；学习指南由 `study-guide/scripts/build.mjs` 构建，并用 jsdom 测试。
- 每个项目保持独立，不共用导航（用户已确认）。
- 只做浅色版，不提供深色模式（用户已确认）。
- 图鉴采用清单式呈现，每个版本的内含物直接全部展开（用户已确认）。

## Brand Commitments

- 学习指南现有的视觉是这组项目的视觉基准，其他页面向它看齐（用户已确认）。
- 名称写作 ILLIT，粉丝名写作 GLLIT。成员名用英文活动名：YUNAH、MINJU、MOKA、WONHEE、IROHA。
- 不特别突出某一位成员，各成员平等展示。

## Evidence on Hand

- 官方商品图和概念图：`album-catalog/dist/images/`、`study-guide/assets/`。版权归 BELIFT LAB、HYBE 等原权利人。
- 资料来源和核实记录：`album-catalog/打开与查证说明.md`，以及 `study-guide/` 各章的 sources。

## Product Principles

- 事实优先：信息准确、可追溯来源，未核实的内容要标明，不编造。
- 收藏者视角：随机内容、固定内容和已拥有状态要一眼可辨。
- 成员平等：任何筛选和展示都不偏向某一位成员。
- 轻量可离线：单文件即可打开，不依赖外部服务。
