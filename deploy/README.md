# 官网三环境部署

以下命令均在项目根目录执行，以 `package.json` 为准。

| 环境 | 用途 | Worker / 地址 | 操作说明 |
| --- | --- | --- | --- |
| 本地 | 开发和本机预览 | Astro 默认 4321；Wrangler 默认 8787 | [local.md](local.md) |
| 测试 | 上线前验收 | `coserops-website-test` | [test.md](test.md) |
| 生产 | 对外服务 | `coserops-website` | [production.md](production.md) |

## 当前状态与前提

已提供 `deploy:local` / `update:local`、`deploy:test` / `update:test`、`deploy:prod` / `update:prod`；`deploy` 是生产部署别名。本地启动开发服务器；远程脚本先构建、检查 TypeScript，再发布指定 Worker。

| 脚本 | 实际命令 |
| --- | --- |
| `deploy:local`、`update:local` | `npm run dev` |
| `deploy:test` | `npm run build && tsc && wrangler deploy --name coserops-website-test` |
| `update:test` | `npm run deploy:test --` |
| `deploy:prod` | `npm run build && tsc && wrangler deploy --name coserops-website` |
| `update:prod`、`deploy` | `npm run deploy:prod --` |

首次部署和更新使用相同的发布操作：不存在时创建，存在时更新同名 Worker。任一步失败都会停止后续步骤。本地两个脚本只启动开发服务，永不远程部署。

当前配置采用一个 `wrangler.json`，通过发布时显式指定 `--name` 区分测试和生产 Worker；尚未配置 Wrangler 的 `env.test`、`env.production`。因此本文不使用 `--env test` 或 `--env production`。

`package.json` 声明 Node.js `>=22`，当前 Astro 7 要求 Node.js `>=22.12.0`、npm `>=9.6.5`，Vite 8 也要求本项目所用 Node.js 至少为 22.12。首次准备或依赖变化时执行 `npm ci`；日常源码更新无需重复安装。

源配置使用 `@astrojs/cloudflare/entrypoints/server`。当前根路由采用 SSR，适配器生成 `dist/server/wrangler.json`，Wrangler 通过 `.wrangler/deploy/config.json` 读取它；不要手动指定旧版构建入口。生成配置可能包含 `SESSION` KV、`IMAGES` 等运行时绑定，发布前应检查生成配置和预演输出，确认资源与账户。

## 部署目标与站点元信息

- Astro 的 `site`：构建时使用的公开站点 URL；站点源码也维护同一正式地址。
- Wrangler 的 `--name`：决定发布到哪个 Worker，不会修改已经生成的 HTML 中的站点 URL。

脚本使用 `astro.config.mjs` 中的 `site` 构建，不要求环境变量。正式站点地址为 `https://www.coser.eu.org`，canonical 和站点地图统一使用该 HTTPS 地址；本地预览也不应将其覆盖为 HTTP 地址。

测试与生产使用同一版本源码，各自重新构建；本地共享的 `dist/` 会被覆盖，不要在同一目录并发构建或跨环境复用旧产物。后续 CI 应使用独立工作目录，并在每次发布前重新构建。

## 隔离范围

不同 Worker 名称可以分开应用发布，但不会自动隔离 Cloudflare 账号、数据库、KV、邮件收件人、Secret 或域名路由。当前官网未配置 D1 或邮件绑定，不需要为了展示页面新增数据库。

如后续增加表单、KV、D1 或自定义 routes，应改用分别维护的环境配置，显式设置每个环境的资源、收件人和域名，逐项验证隔离；不能继续仅依靠 `--name`。不要在共享配置中加入生产域名后仍原样发布测试环境。

## 发布约定

先完成本地检查，再部署测试，最后使用测试通过的同一源码版本部署生产。记录源码提交、构建时站点 URL、Worker 名称和部署版本，便于追溯。

测试访问地址中的占位值必须替换。身份认证可使用本机 `npx wrangler login`；CI 使用安全注入的 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`，不在仓库或日志中写入 Token。

`npm run check` 当前执行构建、`tsc` 和部署预演；它不是完整的浏览器检查，也不包含完整的 `.astro` 模板诊断。部署脚本自动构建并执行类型检查，附加 `--dry-run` 可预演对应环境的发布。

## 参数转发与预演

以下命令均先构建、检查，再由 Wrangler 预演，不远程发布：

```sh
npm run deploy:test -- --dry-run
npm run update:test -- --dry-run
npm run deploy:prod -- --dry-run
npm run update:prod -- --dry-run
npm run deploy -- --dry-run
```

外层 `--` 将参数传给脚本；远程更新和默认部署别名自带内层 `--`，所以参数会继续传到最后的 `wrangler deploy`，不会传给 Astro 构建。其他 Wrangler 参数同理，但不要覆盖固定 Worker 名称或配置。本地别名没有内层 `--`，传递 Astro 参数应使用 `npm run deploy:local -- -- --host 127.0.0.1`，更新同理；也可直接用 `npm run dev -- --host 127.0.0.1`。

唯一官网与 canonical origin 为 `https://www.coser.eu.org`。根域 `coser.eu.org` 不在范围内，不配置 DNS、重定向或 SEO。测试或预览域名尚未确认配置；具体访问地址以实际部署结果为准。
