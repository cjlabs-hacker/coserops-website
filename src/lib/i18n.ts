import { en, type Messages, type TranslationKey } from "./translations/en";
import { zhCN } from "./translations/zh-cn";

export const localeInfo = {
    "zh-cn": { lang: "zh-CN", openGraph: "zh_CN", name: "简体中文" },
    en: { lang: "en", openGraph: "en", name: "English" },
} as const;
export type Locale = keyof typeof localeInfo;
export const locales = Object.keys(localeInfo) as Locale[];
export const isLocale = (value: unknown): value is Locale =>
    typeof value === "string" && Object.hasOwn(localeInfo, value);

const messages: Record<Locale, Messages> = { "zh-cn": zhCN, en };

// Validate every resource at build time, including keys unused by a published page.
for (const locale of locales) {
    for (const key of Object.keys(en) as TranslationKey[]) {
        if (typeof messages[locale]?.[key] !== "string") {
            throw new Error(`Missing translation: ${locale}:${key}`);
        }
    }
}

export function t(locale: Locale, key: TranslationKey): string {
    const value = messages[locale]?.[key];
    if (typeof value !== "string") throw new Error(`Missing translation: ${locale}:${key}`);
    return value;
}
