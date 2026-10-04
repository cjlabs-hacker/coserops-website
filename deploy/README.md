> 2026-10-04 配置更新：已完成 Astro 7 入口迁移，移除旧 `platformProxy`，
> Worker 入口改为 `@astrojs/cloudflare/entrypoints/server`，资源目录由适配器生成。
> Wrangler 使用 `.wrangler/deploy/config.json` 指向的构建配置，不再手动指向旧入口。
> 下文的旧配置兼容性提醒现已处理，但每次升级仍需重新检查。
>
> 项目显式使用 Vite 8，避免 Astro 与 Cloudflare 插件混用 Vite 6 导致
> `Missing field moduleType`。安装依赖应使用更新后的锁文件。
> 适配器默认会在生成配置中加入 `SESSION` KV 和 `IMAGES` 绑定；dry-run 已显示它们。
> 远程发布前应确认自动资源配置和环境隔离，不能仅根据源配置判断所需资源。

# 官网三环境部署

参考 `cloudflare-d1-dashboard/deploy` 的组织方式，划分本地、测试、生产三个环境。本文针对当前 Astro 官网，不包含参考项目的 D1 查询、Token 输入或数据库配置。

| 环境 | 用途 | Worker / 地址 | 操作说明 |
| --- | --- | --- | --- |
| 本地 | 开发和本机预览 | Astro 默认 4321；Wrangler 默认 8787 | [local.md](local.md) |
| 测试 | 上线前验收 | `coserops-website-test` | [test.md](test.md) |
| 生产 | 对外服务 | `coserops-website` | [production.md](production.md) |

## 当前状态与前提

已提供 `deploy:local` / `update:local`、`deploy:test` / `update:test`、`deploy:prod` / `update:prod`；`deploy` 是生产部署别名。本地启动开发服务器；远程脚本先构建、检查 TypeScript，再发布指定 Worker。

部署无需设置站点 URL 环境变量。登录 Cloudflare 后直接运行对应部署脚本即可。

当前配置采用一个 `wrangler.json`，通过发布时显式指定 `--name` 区分测试和生产 Worker；尚未配置 Wrangler 的 `env.test`、`env.production`。因此本文不使用 `--env test` 或 `--env production`。

使用 Node.js 22.12+ 的 22.x 或 Node.js 24 LTS，以及 npm。当前依赖已更新为 Astro 7 系列，`package.json` 的 `node >=22` 声明比实际依赖要求宽松，应以依赖要求为准。此前模板版本的检查结果不能代替当前版本的兼容性检查。

首次部署前需确认当前 Cloudflare 适配器的配置、构建输出与 `wrangler.json` 的入口一致。若 `platformProxy` 等旧版配置或 `dist/_worker.js/index.js` 入口不再适用，应先按照已安装适配器的迁移要求修正，再发布；不要跳过错误强行部署。

## 部署目标与站点元信息

- Astro 的 `--site`：构建时使用的公开站点 URL，影响 canonical、站点地图、RSS 等内容。
- Wrangler 的 `--name`：决定发布到哪个 Worker，不会修改已经生成的 HTML 中的站点 URL。

脚本使用 `astro.config.mjs` 中的 `site` 构建，不要求环境变量。正式站点地址为 `https://www.coser.eu.org`，canonical 和站点地图统一使用该 HTTPS 地址；本地预览也不应将其覆盖为 HTTP 地址。

测试与生产使用同一版本源码，各自重新构建；本地共享的 `dist/` 会被覆盖，不要在同一目录并发构建或跨环境复用旧产物。后续 CI 应使用独立工作目录，并在每次发布前重新构建。

## 隔离范围

不同 Worker 名称可以分开应用发布，但不会自动隔离 Cloudflare 账号、数据库、KV、邮件收件人、Secret 或域名路由。当前官网未配置 D1 或邮件绑定，不需要为了展示页面新增数据库。

如后续增加表单、KV、D1 或自定义 routes，应改用分别维护的环境配置，显式设置每个环境的资源、收件人和域名，逐项验证隔离；不能继续仅依靠 `--name`。不要在共享配置中加入生产域名后仍原样发布测试环境。

## 发布约定

先完成本地检查，再部署测试，最后使用测试通过的同一源码版本部署生产。记录源码提交、构建时站点 URL、Worker 名称和部署版本，便于追溯。

本文的 URL、账户占位值必须替换。身份认证可使用本机 `wrangler login`；CI 使用安全注入的 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`，不在仓库或日志中写入 Token。

`npm run check` 当前执行构建、`tsc` 和部署预演；它不是完整的浏览器检查，也不包含完整的 `.astro` 模板诊断。部署脚本自动构建并执行类型检查，附加 `--dry-run` 可预演对应环境的发布。

`npm run deploy` 会重新构建并发布生产 Worker。首次部署与更新使用相同操作。可运行 `npm run deploy:test -- --dry-run` 或 `npm run deploy:prod -- --dry-run` 仅构建、检查并预演；更新与默认部署别名也支持该参数。不要通过附加参数覆盖固定环境的 Worker 名称或配置。
