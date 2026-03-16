import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt"],
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "as-needed",
});
