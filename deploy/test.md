# 测试环境部署与更新

测试 Worker 使用 `coserops-website-test`。前置条件及环境隔离限制见 [三环境说明](README.md)。

## 首次部署

在项目根目录安装依赖并确认身份：

```sh
npm ci
npx wrangler login
npx wrangler whoami
```

确认正确的 Cloudflare 账户。多个账户时可在当前终端设置 `CLOUDFLARE_ACCOUNT_ID`，CI 必须显式指定目标账户。

无需设置 URL 环境变量，直接执行：

```sh
npm run deploy:test
```

脚本先构建并检查 TypeScript，再发布；前一步失败就停止。仅预演可运行 `npm run deploy:test -- --dry-run`。部署成功后以终端输出和控制台地址为准。站点元信息保持正式地址 `https://www.coser.eu.org`，不改为测试地址。

首次使用 workers.dev 可能需要先设置账户子域或启用该访问入口。当前不保证任何测试或预览域名已配置。无需 Cloudflare Pages 项目；适配器生成的运行时绑定仍需检查，独立 Worker 名称不自动隔离资源或访问权限。

## 更新测试环境

更新源码，依赖有变更时执行 `npm ci`，执行 `npm run update:test`。登录失效时重新登录。

更新预演使用 `npm run update:test -- --dry-run`，参数经别名内置的 `--` 继续传给 Wrangler。

首次部署和更新使用同一个发布操作：不存在时创建，存在时更新同名 Worker。脚本固定选择测试 Worker；不要使用 `npm run deploy` 更新测试，它指向生产。

## 验收与访问控制

以下变量仅用于访问检查，不是部署前提；替换为部署输出的实际地址或已绑定的域名。

```sh
TEST_SITE_URL='https://coserops-website-test.YOUR-SUBDOMAIN.workers.dev'
curl -I "$TEST_SITE_URL/"
curl -I "$TEST_SITE_URL/zh-cn/"
curl -I "$TEST_SITE_URL/en/"
curl -I "$TEST_SITE_URL/zh-cn/about/"
curl -I "$TEST_SITE_URL/en/about/"
curl -I "$TEST_SITE_URL/sitemap.xml"
curl -I "$TEST_SITE_URL/sitemap-zh-cn.xml"
curl -I "$TEST_SITE_URL/sitemap-en.xml"
```

公开可访问时，`/` 应返回 HTTP 302，`Location` 指向 `/zh-cn/`；其余上述路径应返回 200。检查页面标题、canonical、站点地图域名、语言切换、导航和手机显示，canonical 与站点地图仍使用正式域名。当前没有配置分享图片，不将其作为已有功能验收。`/zh-cn/contact/` 与 `/en/contact/` 的表单已禁用、无接收后端，只检查禁用状态与说明，不做提交测试。

测试站默认不能视为私有。未公开内容应配置 Cloudflare Access 等访问控制，并确认 workers.dev、预览地址和其他入口不会绕过保护。启用 Access 后，未认证的 curl 返回登录跳转或拒绝是正常现象，应在认证后验收。

如需防止测试内容被索引，应实现测试环境专属的 `noindex` 元信息或响应头，再检查实际响应；当前配置不会自动提供它。单独的 `robots.txt` 禁止抓取不等于访问控制，也不能保证不被索引。不要把测试的 `noindex` 配置带入生产。

测试通过后记录源码提交，生产使用同一源码版本重新构建，不直接上传测试 `dist/`。
