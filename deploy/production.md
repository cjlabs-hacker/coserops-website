# 生产环境部署与更新

生产 Worker 使用 `coserops-website`，与测试 Worker `coserops-website-test` 分开。先完成 [测试验收](test.md)，并阅读 [三环境说明](README.md)。

## 发布前准备

确认正式域名、部署账户、最终文案、素材授权、联系方式、公开索引策略及维护负责人。当前项目仍含博客模板内容，技术上可部署不代表已满足官网业务上线条件。

在项目根目录执行：

```sh
npm ci
npx wrangler login
npx wrangler whoami
```

确认账户；多账户或 CI 场景用 `CLOUDFLARE_ACCOUNT_ID` 明确目标。已有有效登录时无需每次重复 login。

## 首次部署

无需设置 URL 环境变量，直接执行：

```sh
npm run deploy:prod
```

脚本先构建并检查 TypeScript，再发布 Worker 与静态资源，不需要 Cloudflare Pages。仅预演可运行 `npm run deploy:prod -- --dry-run`。

## 自定义域名

Worker 首次创建后，在 Cloudflare 控制台进入 Workers & Pages，选择 `coserops-website`，在 Settings → Domains & Routes 中添加 Custom Domain。使用已在对应 Cloudflare 账户管理且满足 Custom Domain 要求的域名，等待 DNS 与证书生效。

`astro.config.mjs` 的 `site` 只设置构建中的 URL，不会自动添加域名、修改 DNS 或签发证书。构建使用的 URL 必须与最终域名一致。如果先用 workers.dev 上线、随后改为正式域名，需重新构建和发布。

唯一公开官网为 `https://www.coser.eu.org`，站点地址、canonical、sitemap 和 robots.txt 均使用该地址。根域 `coser.eu.org` 暂不在本次范围内，不处理或配置，也不对其 DNS、重定向、canonical、sitemap 或 SEO 作任何假设，当前没有根域重定向计划。确认 workers.dev 和其他入口的保留及访问策略。若需要隐藏 workers.dev，应单独配置并验证，不要认为绑定自定义域名就自动关闭其他入口。

## 更新生产环境

使用测试通过的同一源码版本。依赖变化时执行 `npm ci`，执行 `npm run update:prod`。

更新会立即影响生产站。首次部署命令不会阻止覆盖已有 Worker；`npm run deploy` 也不是安全的“仅首次发布”命令，它同样会先构建再发布。每次发布记录源码提交、Worker 部署版本和正式站点 URL。

## 上线确认

以下变量仅用于访问检查，不是部署前提；替换为部署输出的实际地址或已绑定的域名。

```sh
PROD_SITE_URL='https://coserops-website.YOUR-SUBDOMAIN.workers.dev'
curl -I "$PROD_SITE_URL/"
curl -I "$PROD_SITE_URL/about/"
curl -I "$PROD_SITE_URL/sitemap-index.xml"
```

在浏览器核对所有已实现页面、导航、资源和手机布局，确认 canonical、分享图及 sitemap 使用正式域名，无占位文案或错误的测试 `noindex`。404、联系页和表单等功能以实际实现范围为准；未实现时不能将其记为验收通过。

如果已有表单，进行一次可识别的上线验收提交，确认接收端可收到且未投递到测试收件人。关注 Cloudflare 请求错误、资源限额和日志，避免记录咨询个人信息。

## 回退

发布前记录可用的上一部署版本。出现问题时，可通过 Cloudflare 部署历史恢复确认可用的版本；或取上一可用源码到独立工作目录，确认 `astro.config.mjs` 中的正式 `site` 后重新安装、构建和发布。不要通过破坏当前工作区的方式回退源码。

回退后重新验证域名、页面和业务流程。Worker 代码回退不会自动恢复外部数据、DNS、所有环境资源或业务消息；未来引入这些能力后，需要增加对应的恢复方案。
