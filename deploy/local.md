# 本地运行与更新

本地运行不向 Cloudflare 发布。先阅读 [三环境说明](README.md)，准备 Node.js 22.12+ 的 22.x 或 Node.js 24 LTS 和 npm。

## 首次开发

在当前官网项目根目录执行：

```sh
npm ci
npm run deploy:local -- --host 127.0.0.1
```

默认打开 `http://127.0.0.1:4321/`，以终端实际输出为准。保持终端运行，源码修改通常会热更新。当前没有远程业务绑定，本地开发不需要 Cloudflare 登录；未来配置远程绑定后需重新确认是否会访问真实服务。

## 接近部署环境的本机预览

需要检查构建产物在 Workers 运行时的表现时，在项目根目录执行：

```sh
npm run build
npx tsc
npx wrangler dev --local --ip 127.0.0.1 --port 8787
```

打开 `http://127.0.0.1:8787/`。这是本地 Worker，不是远程部署。若构建或类型检查失败，先修正再继续启动。

日常也可以运行已有的 `npm run preview`，它会先构建再运行 Wrangler。构建统一保留正式站点地址 `https://www.coser.eu.org`，canonical 和站点地图不使用本机地址。本地开发和预览服务暂未配置 TLS，因此本机访问地址仍使用 HTTP；这不影响官网公开地址使用 HTTPS。

## 更新与停止

修改依赖或配置后，在旧服务终端按 Ctrl+C，再执行 `npm ci`，使用 `npm run update:local -- --host 127.0.0.1` 重启开发服务。两个本地脚本均为 `npm run dev` 的别名，不会远程发布或关闭旧服务。只有源码变更时通常无需重复安装依赖。

Wrangler 预览读取 `dist/`；源码改动后需重新构建。端口被占用时选择其他端口或停止已确认属于自己的旧服务，不应终止其他项目进程。

## 确认运行正常

```sh
curl -I http://127.0.0.1:4321/
```

若启动的是 Worker 预览，则使用：

```sh
curl -I http://127.0.0.1:8787/
curl -I http://127.0.0.1:8787/about/
curl -I http://127.0.0.1:8787/sitemap-index.xml
```

首页、现有关于页和站点地图应返回成功。浏览器确认图片、样式、导航和手机布局；新业务页面仅在实现后纳入检查，不把尚未创建的 `/contact` 当作已有功能。

当前没有联系表单 API，不需要执行参考项目的 `/api/query` 或 D1 查询。
