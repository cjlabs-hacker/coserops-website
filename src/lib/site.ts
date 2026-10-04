export const site = "https://www.coser.eu.org";
import {locales, t, type Locale} from "./i18n";

export {locales, isLocale, type Locale} from "./i18n";

export type Status = "current" | "development" | "planned";

type Page = { title: string; description: string; eyebrow: string; h1: string; intro: string };

const zh = {
    home: {
        title: "CoserOps | 多渠道客户运营平台",
        description: "了解 CoserOps 如何规划连接客户线索、触达活动、客户支持与社群互动。查看渠道信息与能力状态，沟通你的客户运营需求。",
        eyebrow: "Coser Operations Center",
        h1: "CoserOps 多渠道客户运营平台",
        intro: "CoserOps 围绕客户全生命周期规划运营工作空间，以统一客户记录连接渠道上下文，帮助团队组织线索获取、经许可的触达、客户支持与关系维护。具体能力与渠道开放范围以页面标注的状态为准。"
    },
    product: {
        title: "产品方向与能力状态 | CoserOps",
        description: "了解 CoserOps 如何以统一客户记录规划多渠道客户运营，并查看公开的能力状态与边界。",
        eyebrow: "产品方向",
        h1: "让客户上下文持续可见",
        intro: "CoserOps 正在围绕同一客户记录组织跨渠道工作。它不是一组彼此独立的群发工具，而是连接线索、对话、许可和后续行动的运营方向。"
    },
    solutions: {
        title: "客户运营场景 | CoserOps",
        description: "按线索、触达、支持和社群互动场景探索 CoserOps 的客户运营规划。",
        eyebrow: "解决方案",
        h1: "从客户问题开始组织工作",
        intro: "选择与你的流程最接近的场景，了解可讨论的工作方式、相关渠道方向与前提。"
    },
    channels: {
        title: "渠道状态与规划 | CoserOps",
        description: "查看 Telegram、WhatsApp、SMS 和电子邮件在 CoserOps 中的公开规划与使用前提。",
        eyebrow: "渠道",
        h1: "为渠道上下文预留清晰边界",
        intro: "渠道名称不等于已经支持。以下内容说明 CoserOps 正在规划的用途，以及接入前仍需确认的条件。"
    },
    resources: {
        title: "客户运营资源 | CoserOps",
        description: "查看 CoserOps 计划围绕多渠道客户运营发布的指南主题与编辑范围。",
        eyebrow: "资源中心",
        h1: "为可核实的运营知识留出位置",
        intro: "我们将按客户生命周期和渠道问题组织指南。以下为已规划的主题，不是已发布文章或产品承诺。"
    },
    about: {
        title: "关于 CoserOps | Coser Operations Center",
        description: "了解 CoserOps 的品牌释义、产品方向和官方网站范围。",
        eyebrow: "关于",
        h1: "关于 CoserOps",
        intro: "CoserOps 是 Coser Operations Center（客户运营中心）的品牌名称。COSER 代表 Customer Operations, Service, Engagement and Reach，即客户运营、服务、互动与触达。"
    },
    contact: {
        title: "咨询客户运营方案 | CoserOps",
        description: "说明你的客户运营流程、关注渠道与需求，了解 CoserOps 的规划适配范围。",
        eyebrow: "联系",
        h1: "讨论你的客户运营流程",
        intro: "适合讨论跨渠道客户沟通、线索承接、经许可的触达、客户支持或社群互动。当前网站尚未连接咨询接收后端，因此表单不会存储或发送信息。"
    },
    privacy: {
        title: "隐私说明草案 | CoserOps",
        description: "CoserOps 官网隐私说明的当前草案和审核范围。",
        eyebrow: "法律",
        h1: "隐私说明草案",
        intro: "本页面尚待确认运营主体、数据接收方式、保留期限和适用法律后进行正式法律审核。"
    },
    terms: {
        title: "网站使用条款草案 | CoserOps",
        description: "CoserOps 官网使用条款的当前草案和适用范围。",
        eyebrow: "法律",
        h1: "网站使用条款草案",
        intro: "本页面仅说明官方网站的信息使用边界，尚待法律审核；它不是产品服务协议。"
    }
};

const en: Record<keyof typeof zh, Page> = {
    home: {
        title: "CoserOps | Multi-channel Customer Operations Platform",
        description: "Explore CoserOps for customer acquisition, outreach, support and engagement. Review channel plans and availability, and discuss your customer operations needs.",
        eyebrow: "Coser Operations Center",
        h1: "CoserOps Multi-channel Customer Operations Platform",
        intro: "CoserOps is being built around the customer lifecycle, with a unified customer record and channel context at its core. Its product direction connects lead acquisition, consent-based outreach, customer support and ongoing engagement. See the published status of each capability and channel for availability."
    },
    product: {
        title: "Product Direction and Availability | CoserOps",
        description: "See how CoserOps is planned around a unified customer record and review its published capability boundaries.",
        eyebrow: "Product direction",
        h1: "Keep customer context in view",
        intro: "CoserOps is being planned to organize work around one customer record across channels. It is not a collection of unrelated broadcast tools: the direction connects leads, conversations, consent and next actions."
    },
    solutions: {
        title: "Customer Operations Solutions | CoserOps",
        description: "Explore CoserOps planning for lead capture, consent-based outreach, support and community engagement.",
        eyebrow: "Solutions",
        h1: "Start with the customer problem",
        intro: "Choose the scenario closest to your workflow to understand the work patterns, channel directions and prerequisites worth discussing."
    },
    channels: {
        title: "Channel Status and Plans | CoserOps",
        description: "Review the public planning and prerequisites for Telegram, WhatsApp, SMS and email in CoserOps.",
        eyebrow: "Channels",
        h1: "Set clear boundaries around channel context",
        intro: "Naming a channel does not mean it is supported. These pages describe the intended use and conditions that still need confirmation before an integration is available."
    },
    resources: {
        title: "Customer Operations Resources | CoserOps",
        description: "Explore planned guidance topics for multi-channel customer operations from CoserOps.",
        eyebrow: "Resources",
        h1: "A place for verifiable operating knowledge",
        intro: "Guidance will be organized around the customer lifecycle and channel questions. The topics below are planned, not published articles or product commitments."
    },
    about: {
        title: "About CoserOps | Coser Operations Center",
        description: "Learn about the CoserOps brand, product direction and role of this official website.",
        eyebrow: "About",
        h1: "About CoserOps",
        intro: "CoserOps stands for Coser Operations Center. COSER stands for Customer Operations, Service, Engagement and Reach."
    },
    contact: {
        title: "Discuss Customer Operations | CoserOps",
        description: "Describe your customer operations workflow, channels and needs to discuss where CoserOps may fit.",
        eyebrow: "Contact",
        h1: "Discuss your customer operations",
        intro: "This is for cross-channel communication, lead capture, consent-based outreach, customer support and community engagement discussions. The website has no inquiry delivery backend yet, so this form does not store or send information."
    },
    privacy: {
        title: "Privacy Notice Draft | CoserOps",
        description: "The current privacy notice draft and review scope for the CoserOps website.",
        eyebrow: "Legal",
        h1: "Privacy notice draft",
        intro: "This page requires legal review after the operating entity, data receiver, retention period and applicable law have been confirmed."
    },
    terms: {
        title: "Website Terms Draft | CoserOps",
        description: "The current website terms draft and scope for CoserOps.",
        eyebrow: "Legal",
        h1: "Website terms draft",
        intro: "This page describes information-use boundaries for this official website pending legal review. It is not a product service agreement."
    }
};
export type PageKey = keyof typeof zh;
const pages: Record<Locale, Record<PageKey, Page>> = {"zh-cn": zh, en};
export const copy = (locale: Locale, key: PageKey): Page => {
    const page = pages[locale]?.[key];
    if (!page) throw new Error(`Missing page content: ${locale}/${key}`);
    return page;
};
export const pathFor = (locale: Locale, slug = "") => {
    const normalized = slug.replace(/^\/+|\/+$/g, "");
    return `/${locale}/${normalized ? `${normalized}/` : ""}`;
};
export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
export const labels = (locale: Locale) => ({
    product: t(locale, "nav.product"),
    solutions: t(locale, "nav.solutions"),
    channels: t(locale, "nav.channels"),
    resources: t(locale, "nav.resources"),
    about: t(locale, "nav.about"),
    contact: t(locale, "nav.contact"),
    privacy: t(locale, "nav.privacy"),
    terms: t(locale, "nav.terms"),
    discuss: t(locale, "nav.discuss"),
    explore: t(locale, "nav.explore"),
    planned: t(locale, "status.planned"),
    development: t(locale, "status.development"),
    current: t(locale, "status.current"),
    home: t(locale, "nav.home"),
});
export const statusText = (locale: Locale, status: Status) => labels(locale)[status];

export function details(locale: Locale) {

    const channels = [
        ["telegram", "Telegram", t(locale, "content.customer_conversations_bot_or_community_business_scenarios"), "planned", t(locale, "content.connection_method_account_permissions_and_group_scope_need")],
        ["whatsapp", "WhatsApp", t(locale, "content.customer_communication_service_and_consent_based_outreach_direction"), "planned", t(locale, "content.business_platform_provider_templates_and_conversation_limits_need")],
        ["sms", "SMS", t(locale, "content.consent_based_notifications_outreach_and_replies"), "planned", t(locale, "content.provider_geography_numbers_two_way_messaging_and_opt")],
        ["email", t(locale, "content.email"), t(locale, "content.customer_communication_support_and_campaign_direction"), "planned", t(locale, "content.sending_and_receiving_domain_authentication_delivery_limits_and")]
    ] as [string, string, string, Status, string][];
    const solutions = [
        ["lead-capture", t(locale, "content.lead_capture_and_follow_up"), t(locale, "content.bring_consented_lead_sources_customer_context_and_follow")],
        ["consent-outreach", t(locale, "content.consent_based_customer_outreach"), t(locale, "content.plan_relevant_outreach_and_next_actions_around_consent")],
        ["customer-support", t(locale, "content.customer_support_and_inbox"), t(locale, "content.help_teams_see_prior_conversation_context_and_outstanding")],
        ["community-engagement", t(locale, "content.customer_and_community_engagement"), t(locale, "content.plan_ongoing_relationship_care_around_contact_interactions_and")]
    ];
    return {channels, solutions};
}

export const routes = ["", ...Object.keys(zh).filter(key => key !== "home"), ...details("en").channels.map(([id]) => `channels/${id}`), ...details("en").solutions.map(([id]) => `solutions/${id}`)];
export const publishedRoutes: Record<Locale, readonly string[]> = {"zh-cn": routes, en: routes};
export const hasRoute = (locale: Locale, slug: string) => publishedRoutes[locale].includes(slug);
export const isIndexable = (slug: string) => !["privacy", "terms"].includes(slug);

export function pageFor(locale: Locale, slug = ""): Page {
    if (!hasRoute(locale, slug)) throw new Error(`Unpublished route: ${locale}/${slug}`);
    const base = copy(locale, (slug.split("/")[0] || "home") as PageKey);
    if (!slug.includes("/")) return base;
    const {channels, solutions} = details(locale);
    const detail = (slug.startsWith("channels/") ? channels : solutions).find(([id]) => slug.endsWith(`/${id}`));
    if (!detail) throw new Error(`Missing page content: ${slug}`);
    return {...base, title: `${detail[1]} | CoserOps`, h1: detail[1], description: detail[2], intro: detail[2]};
}
