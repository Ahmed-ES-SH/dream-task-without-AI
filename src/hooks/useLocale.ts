import { useParams } from "react-router";

export type localeType = "en" | "ar";

export default function useLocale() {
  const { locale } = useParams<{ locale: localeType }>();
  return locale;
}
