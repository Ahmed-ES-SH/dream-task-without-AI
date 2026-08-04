import useLocale from "@/hooks/useLocale";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface LocaleLinkProps {
  children: ReactNode;
  to: string;
  className?: string;
}

export default function LocaleLink({
  children,
  to,
  className,
}: LocaleLinkProps) {
  const locale = useLocale() ?? "en";

  return (
    <Link className={`${className}`} to={`/${locale}/${to}`}>
      {children}
    </Link>
  );
}
