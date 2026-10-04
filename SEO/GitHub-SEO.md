# GitHub 仓库展示与 SEO

公开仓库：https://github.com/cjlabs-hacker/coserops-website

目标是明确品牌、源码用途和官网入口，帮助访客及搜索引擎理解仓库与官网的关系。GitHub 收录及排名由搜索引擎决定，仓库链接不保证提高官网排名。

## 1. 仓库定位

本仓库是 CoserOps 中英文官方网站源码，使用 Astro 和 TypeScript，通过 Cloudflare Workers 部署。它不是完整客户运营产品的源码，也不能以仓库公开为依据宣称所有产品能力已经开源或可用。

统一品牌名称为 CoserOps，类别为 Multi-channel Customer Operations Platform / 多渠道客户运营平台。

## 2. 配置仓库 About

打开仓库首页右侧 About 设置，填写以下信息。

### Description

可直接使用的中英文描述：

```text
CoserOps 官方网站源码｜多渠道客户运营平台。Official website source for CoserOps — a multi-channel customer operations platform. Built with Astro & TypeScript.
```

### Website

```text
https://www.coser.eu.org/
```

### Topics

选择与仓库实际内容相关的标签：

```text
coserops
customer-operations
multilingual
astro
typescript
```

不用堆砌无关词，不添加会暗示已经实现 Telegram、WhatsApp 等产品集成功能的标签。About 属于 GitHub 仓库设置，修改本地 README 不会自动更新它。

## 3. README 的中英文展示

当前 [README.md](../README.md) 已整理为：

- 顶部“简体中文 | English”导航。
- 中文在前，英文在后，两部分包含对应信息。
- 品牌定位、标语、COSER 释义和仓库用途。
- 中文官网及英文官网的真实链接。
- 域名策略、开发部署、路由和多语言维护说明。

官网入口：

```text
https://www.coser.eu.org/zh-cn/
https://www.coser.eu.org/en/
```

维护时同步更新两种语言的事实信息。不要反复塞关键词、增加无关链接或将 README 改成缺少开发信息的营销页。

本地 README 修改发布到 GitHub 后，公开仓库才会显示新内容。是否推送、是否已经更新远端，应以实际仓库状态为准。

## 4. 官网与 GitHub 的关联

仓库 About 和 README 链接到官网。官网若需要展示源码入口，可以在页脚或 About 页加入“官网源码 / Website source”链接：

```text
https://github.com/cjlabs-hacker/coserops-website
```

官网页脚已加入该链接，使用普通可访问的 HTML `a`，不依赖 SEO 插件、追踪 SDK 或客户端脚本。

用途是提供导航、技术透明度和来源信息，不把它当作保证有效的外链排名策略。`Organization.sameAs` 仅指向能代表同一组织身份的页面，不因它是一个代码仓库就自动添加。

GitHub 的 Actions、Projects、Security and quality、Insights 和 Settings 页面不作为官网 SEO 目标页面：其中部分页面需要登录或权限，公开可见的部分也不保证被 Google 建立索引。SEO 重点应放在仓库主页、README、About、Topics 和官网与仓库之间的普通链接。

## 5. 与 Search Console 的边界

官网的 Search Console 网址前缀是 `https://www.coser.eu.org/`，不覆盖 `github.com`。

- 不把 GitHub 仓库、README、Issues 或 Releases 地址加入官网 sitemap。
- 不在官网资源中请求 GitHub 地址编入索引。
- 不将仓库页面 canonical 设置为官网首页，也不将官网 canonical 指向仓库。
- 不创建无内容的 Issues、Releases 或多个重复仓库来制造搜索入口。

GitHub 负责其域名的抓取入口。公开仓库可能被自动发现，但公开并不保证收录。

## 6. 当前进度与维护清单

截至 2026 年 10 月 5 日，本地 README 已完成双语整理。远端 README、About 配置和官网源码链接是否生效，尚未在本文核验。

- [ ] 确认 GitHub About 使用中英文 Description。
- [ ] 确认 Website 字段为 `https://www.coser.eu.org/`。
- [ ] 设置真实相关的 Topics。
- [ ] 将审核后的 README 更新发布到仓库，检查语言导航和链接。
- [x] 官网页脚已加入指向 GitHub 仓库的普通 HTML 链接，中文显示“官网源码”，英文显示“Website source”。

每次域名、脚本或项目用途变化时，同步维护 About 与 README。只发布有意义的版本说明；不把 Stars 数量或搜索收录当作产品质量保证。

## 7. 参考

- [仓库首页](https://github.com/cjlabs-hacker/coserops-website)
- [项目 README](../README.md)
- [Google Search Console 配置与维护](Google-Search-Console.md)
