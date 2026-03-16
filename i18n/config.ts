export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function getLocaleFromRequest(request: { headers: { get: (name: string) => string | null } }): Locale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const first = acceptLanguage.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first.startsWith("pt")) return "pt";
  return "en";
}
