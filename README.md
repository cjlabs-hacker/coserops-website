# CoserOps Website

[简体中文](#简体中文) | [English](#english)

## 简体中文

**CoserOps — 在一个工作空间，开展每个客户渠道的运营。**

CoserOps 是 Coser Operations Center（客户运营中心）的品牌名称，定位为多渠道客户运营平台。COSER 的官方释义为 **Customer Operations, Service, Engagement and Reach**，即客户运营、服务、互动与触达。

本仓库包含中英文官方网站的源码，使用 Astro 和 TypeScript 构建，通过 Cloudflare Workers 部署。本仓库不包含产品应用；产品能力和渠道开放范围以官网公开状态为准。

### 官网入口

| 语言 | 官方网站 |
| --- | --- |
| 简体中文 | [中文官网](https://www.coser.eu.org/zh-cn/) |
| English | [英文官网](https://www.coser.eu.org/en/) |

[www.coser.eu.org](https://www.coser.eu.org/) 默认进入中文首页，用户可通过顶部语言图标切换中英文。

### 域名策略

唯一公开官网及规范地址为 `https://www.coser.eu.org`，站点地址、canonical、站点地图和 robots.txt 均使用该地址。

其他子域可按职责隔离产品应用、管理后台、API、资源和预览环境，具体地址与开放范围尚未确认。其他子域不默认公开或可索引；未明确对外公开的环境应设置 `noindex`，非公开应用和预览还需访问控制。官网站点地图只收录 `www.coser.eu.org` 上可索引的规范页面。

根域 `coser.eu.org` 暂不处理，不配置 DNS、跳转或 SEO 策略，也没有根域重定向计划。

### 本地开发

需要 Node.js 22 或更新版本，同时满足所安装工具的版本要求。

```sh
npm ci
npm run dev
npm run build
```

本地默认访问地址为 `http://localhost:4321`。

### 部署与更新

| 环境 | 启动或部署 | 更新 |
| --- | --- | --- |
| 本地开发 | `npm run deploy:local` | `npm run update:local` |
| 测试 Worker | `npm run deploy:test` | `npm run update:test` |
| 生产 Worker | `npm run deploy:prod` | `npm run update:prod` |

本地命令仅启动开发服务，不向 Cloudflare 发布。测试发布目标为 `coserops-website-test`，生产发布目标为 `coserops-website`。`npm run deploy` 同样会发布到生产环境。

准备工作、部署预演、域名绑定和环境隔离见 [部署文档](deploy/README.md)。`npm run check` 执行构建、TypeScript 检查及 Wrangler 部署预演，不会真正发布，也不完整检查 Astro 模板类型。

### 已发布路由

- `/` 使用 HTTP 302 跳转到 `/zh-cn/`。
- `/zh-cn/` 和 `/en/` 分别为中文、英文首页。
- 各语言下包含 `product`、`solutions`、`channels`、`resources`、`about`、`contact`、`privacy` 和 `terms` 页面。
- 场景详情位于 `solutions/` 下，渠道详情位于 `channels/` 下。
- 搜索引擎入口包括 `/sitemap.xml`、`/sitemap-zh-cn.xml`、`/sitemap-en.xml` 和 `/robots.txt`。

联系表单在确认接收后端、负责人和隐私处理流程前保持不可提交。产品和渠道页面如实标注规划状态，不宣称未经验证的开放能力。

### 多语言维护

`src/lib/i18n.ts` 定义语言注册、HTML/Open Graph 语言标记、语言名称和类型安全的 `t(locale, key)` 翻译函数。共享 UI 及页面正文位于 `src/lib/translations/en.ts` 和 `zh-cn.ts`，使用 `nav`、`status`、`footer`、`layout`、`navigation` 和 `content` 命名空间。

英文资源定义翻译键集合，每种语言必须提供完整的翻译键。缺失翻译会在构建时报错，不静默回退到其他语言。

新增语言时，在 `i18n.ts` 注册语言信息和完整翻译资源，并在 `src/lib/site.ts` 补充页面元信息及已发布路由。首页路由、语言切换和 SEO 语言标记使用语言注册表。

根入口固定跳转到中文首页，不检测浏览器语言。首页 `x-default` 指向 `/zh-cn/`，其他可索引页面指向英文对应页。

## English

**CoserOps — One place to operate every customer channel.**

CoserOps (Coser Operations Center) is a multi-channel customer operations platform — 多渠道客户运营平台. COSER stands for **Customer Operations, Service, Engagement and Reach**.

This repository contains the source code for the official Chinese and English website, built with Astro and TypeScript and deployed through Cloudflare Workers. It is not the product application. Product capabilities and channel availability are described by their published status on the website.

### Website

| Language | Official website |
| --- | --- |
| 简体中文 | [中文官网](https://www.coser.eu.org/zh-cn/) |
| English | [English website](https://www.coser.eu.org/en/) |

The main entry at [www.coser.eu.org](https://www.coser.eu.org/) opens the Chinese homepage. Visitors can switch languages using the header icon.

### Domain strategy

The only public official website and canonical origin is https://www.coser.eu.org. Site URLs, canonical URLs, sitemaps, and robots.txt use this origin.

Separate subdomains can isolate the product app, admin/control interface, API, assets, and preview environments. Their addresses and availability are not yet confirmed. Subdomains are not automatically public or indexable: alternate subdomains must use `noindex` unless intentionally public, with access controls for private apps and previews. Only indexable canonical pages on `www.coser.eu.org` belong in the website sitemaps.

The root domain `coser.eu.org` is out of scope for now. Do not configure or process it; no DNS, redirect, canonical, sitemap, or SEO assumption is made for it, and no root-domain redirect is planned.

### Development

Requires Node.js 22 or newer, subject to the requirements of the installed tools.

```sh
npm ci
npm run dev
npm run build
```

The site is available locally at `http://localhost:4321`.

### Deployment

| Environment | Start or deploy | Update |
| --- | --- | --- |
| Local development | `npm run deploy:local` | `npm run update:local` |
| Test Worker | `npm run deploy:test` | `npm run update:test` |
| Production Worker | `npm run deploy:prod` | `npm run update:prod` |

Local commands start the development server and do not publish to Cloudflare. Test deployments target `coserops-website-test`; production deployments target `coserops-website`. `npm run deploy` also publishes to production.

See the [deployment guide](deploy/README.md) for setup, dry runs, domain binding and environment isolation. Run `npm run check` for the build, TypeScript check and Wrangler deployment dry run; it does not publish the site or fully type-check Astro templates.

### Published routes

- `/` redirects to `/zh-cn/` with HTTP 302; visitors can switch languages in the header
- `/zh-cn/` and `/en/` localized home pages
- Localized `product`, `solutions`, `channels`, `resources`, `about`, `contact`, `privacy`, and `terms` routes
- Scenario detail routes under `solutions/` and channel detail routes under `channels/`
- `/sitemap.xml`, `/sitemap-zh-cn.xml`, `/sitemap-en.xml`, and `/robots.txt`

The contact form is deliberately unavailable until a verified delivery backend, owner, and privacy process are configured. Product and channel pages use published planning status and do not claim unverified availability.

### Localization

`src/lib/i18n.ts` defines the supported locale registry, HTML/Open Graph language tags,
self-names, and the typed `t(locale, key)` helper. Shared UI and page-body copy live
in `src/lib/translations/en.ts` and `zh-cn.ts`, with `nav`, `status`, `footer`,
`layout`, `navigation`, and `content` namespaces. English defines the key schema;
every locale must supply every key. Missing translations throw during the build,
without falling back to another language.

To add a language, register its metadata and complete translation resource in
`i18n.ts`, then supply its page metadata and published routes in `src/lib/site.ts`.
Homepage routes, language-switch links, and SEO language tags use the registry.
The root entry redirects to the Chinese homepage without browser-language detection. Homepage `x-default` points to `/zh-cn/`; other indexable pages retain their English equivalent as `x-default`.
