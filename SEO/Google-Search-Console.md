# Google Search Console 配置与维护

本文记录 CoserOps 官网的 Google Search Console 操作与后续维护。Search Console 用于查看抓取、索引和搜索表现；完成配置不保证收录或排名。

## 1. 官网与资源范围

| 项目 | 地址 |
| --- | --- |
| 唯一公开官网 | https://www.coser.eu.org/ |
| 中文首页 | https://www.coser.eu.org/zh-cn/ |
| 英文首页 | https://www.coser.eu.org/en/ |
| Search Console 资源类型 | 网址前缀 |
| 已添加的网址前缀 | `https://www.coser.eu.org/` |

[打开当前资源的站点地图报告](https://search.google.com/search-console/sitemaps?resource_id=https%3A%2F%2Fwww.coser.eu.org%2F)。

网址前缀资源仅覆盖匹配协议和主机名的路径，不包含 `https://coser.eu.org/` 或其他子域。根域暂不处理。官网根路径使用 HTTP 302 跳转到中文首页，网址检查优先使用实际的中英文页面。

## 2. 当前进度

截至 2026 年 10 月 5 日，根据本次操作记录：

- 已添加网址前缀资源，采用 HTML 文件验证方式；验证文件已位于项目 `public/`。
- 已提交站点地图，用户已确认站点地图操作处理完成。
- 已进行网址检查；曾遇到手动索引请求每日配额限制。
- “效果”报告曾提示正在处理数据，需要等待。

这些是操作进度，不代表所有页面已经收录，也不代表站点地图最终状态已经由本文核验。读取是否成功、索引状态及数据以 Search Console 当前报告为准。

## 3. 所有权验证

不方便修改 DNS 时，使用“HTML 文件”验证：

1. 从 Google 下载专属验证文件，不更改名称和内容。
2. 将文件放入项目 `public/`，不要放到 `src/pages/` 或语言子目录。
3. 按 [生产部署文档](../deploy/production.md)发布上线。
4. 确认 Google 指定的文件地址直接返回验证内容，不是 404、登录页或首页。
5. 返回 Search Console 点击“验证”。

当前验证文件为 `public/google5afff05aaa55936c.html`，公开访问地址为：

```text
https://www.coser.eu.org/google5afff05aaa55936c.html
```

验证文件是公开的所有权标识，验证成功后继续保留，Google 可能再次检查。此方式不需要安装 Analytics 或跟踪代码管理器。

## 4. 站点地图

推荐提交总索引：

```text
https://www.coser.eu.org/sitemap.xml
```

总索引引用：

```text
https://www.coser.eu.org/sitemap-zh-cn.xml
https://www.coser.eu.org/sitemap-en.xml
```

若界面已经显示 `https://www.coser.eu.org/` 前缀，输入框只填 `sitemap.xml`。子地图可单独提交用于排查，但正常情况下不必重复提交。

站点地图只包含正式官网的已发布、可索引页面。根路径重定向、隐私与条款等当前不索引页面、测试域名和 GitHub 地址不应加入。

### “无法抓取 / 无法读取”排查

1. 确认资源和地图都使用 `https://www.coser.eu.org/`。
2. 打开条目详情，记录错误和上次读取时间，不只查看列表中的“未知”。
3. 检查总索引、子地图和 robots.txt 的状态、响应内容与跳转。
4. 若普通访问正常但 Google 仍失败，结合 Cloudflare 安全事件检查相关请求是否被挑战、拦截或限速。
5. 刚提交时可以等待重试和报告更新；持续失败则继续查具体原因，不无限等待，也不反复删除提交。

可在终端检查：

```sh
curl -i https://www.coser.eu.org/sitemap.xml
curl -i https://www.coser.eu.org/sitemap-zh-cn.xml
curl -i https://www.coser.eu.org/sitemap-en.xml
curl -i https://www.coser.eu.org/robots.txt
```

地图应返回 HTTP 200 和 XML，robots.txt 应正常访问且没有阻止官网抓取。普通请求成功不证明 Google 请求成功；仅使用 Googlebot User-Agent 也不能证明真实 Googlebot 可访问。

Sitemap 的 `http://www.sitemaps.org/schemas/sitemap/0.9` 是标准 XML 命名空间，不能替换为 HTTPS。不要为排查而关闭全站安全防护。

## 5. 网址检查与索引请求

先检查中文和英文首页，再检查重要产品页及重点渠道页：

```text
https://www.coser.eu.org/zh-cn/
https://www.coser.eu.org/en/
https://www.coser.eu.org/zh-cn/product/
https://www.coser.eu.org/en/product/
```

未收录时使用“测试实际网址”，确认网页可访问、允许索引，再按需请求编入索引。已索引页面还应关注 Google 选择的 canonical 是否符合预期；实际网址测试不能保证最终收录或证明 sitemap 抓取成功。

出现每日配额提示时停止重复提交，按提示次日再尝试。配额影响手动请求，不会关闭正常抓取，也不需要修改网站代码。Google 没有公开一个对所有资源都固定的每日额度。

## 6. 更新内容后如何处理

| 改动 | 操作 |
| --- | --- |
| 少量文案调整 | 部署后等待自动重新抓取 |
| 核心页面大幅更新 | 部署后可在配额允许时请求索引 |
| 新增页面 | 纳入 sitemap，并添加有意义的内部链接 |
| 修改或移除 URL | 更新链接和 sitemap，有等价替代时设置永久重定向；否则按情况返回 404/410 |

Google 通常会自动发现更新，但时间不固定。当前 sitemap 没有 `lastmod` 也可以工作；以后添加时应表示真实内容更新时间，不能每次构建都标记全部页面更新。

标题和描述修改后，搜索结果仍可能由 Google 根据查询重新生成。内容更新不保证排名上升。

## 7. 日常维护

| 报告 | 关注重点 | 频率 |
| --- | --- | --- |
| 站点地图 | 最终读取成功、子地图可用 | 初次设置及路由变化后 |
| 网页索引 | 重要页面的抓取错误、意外 noindex、重复或 canonical 问题 | 每周 |
| 效果 | 查询词、展示、点击及页面表现，分别观察中英文页面 | 每周 |
| 核心网页指标、HTTPS | 有数据后处理具体问题 | 定期 |
| 安全问题、人工处置 | 异常警告 | 收到通知时及时检查 |

确认账号邮件通知可用。新站无数据或样本不足时，不等于网站出错。不要追求全部页面收录：有意 noindex 的页面保持不索引；不要用“移除网址”修复未收录问题。

完成基础配置后，把精力放在真实、具体的页面内容、移动体验和内部链接上，不购买外链或批量生成低价值页面。

## 8. 参考

- [Search Console](https://search.google.com/search-console)
- [Google Search Central](https://developers.google.com/search/docs)
- [GitHub 仓库 SEO 文档](GitHub-SEO.md)
