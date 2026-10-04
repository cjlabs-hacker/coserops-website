# 本地运行与更新

本地运行不向 Cloudflare 发布。先阅读 [三环境说明](README.md)，准备 Node.js 22.12+ 和 npm 9.6.5+。

## 首次开发

在当前官网项目根目录执行：

```sh
npm ci
npm run deploy:local -- -- --host 127.0.0.1
```

访问 `http://127.0.0.1:4321/`，端口以终端实际输出为准。保持终端运行，源码修改通常会热更新。默认本地开发无需 Cloudflare 登录；适配器可能生成运行时绑定，启用远程资源前应检查配置。额外一层 `--` 用于穿过 `npm run dev` 将参数传给 Astro；无需参数时直接运行 `npm run deploy:local`。

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

需要重启时，在旧服务终端按 Ctrl+C，再使用 `npm run update:local -- -- --host 127.0.0.1`。仅依赖变化时重新执行 `npm ci`，普通源码或配置修改无需重复安装。两个本地脚本均为 `npm run dev` 的别名，不会远程发布或关闭旧服务。

Wrangler 预览读取 `dist/`；源码改动后需重新构建。端口被占用时选择其他端口或停止已确认属于自己的旧服务，不应终止其他项目进程。

## 确认运行正常

```sh
curl -I http://127.0.0.1:4321/
```

若启动的是 Worker 预览，则使用：

```sh
curl -I http://127.0.0.1:8787/
curl -I http://127.0.0.1:8787/zh-cn/
curl -I http://127.0.0.1:8787/en/
curl -I http://127.0.0.1:8787/zh-cn/about/
curl -I http://127.0.0.1:8787/en/about/
curl -I http://127.0.0.1:8787/sitemap.xml
curl -I http://127.0.0.1:8787/sitemap-zh-cn.xml
curl -I http://127.0.0.1:8787/sitemap-en.xml
```

`/` 应返回 HTTP 302，`Location` 指向 `/zh-cn/`；其余上述路径应返回 200。开发服务器也可用同一路径检查。浏览器确认样式、导航、语言切换和手机布局。

联系页为 `/zh-cn/contact/` 与 `/en/contact/`，表单与提交按钮均禁用，没有接收后端；验收禁用状态及说明即可，不做提交测试。
