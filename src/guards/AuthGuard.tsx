import useLocale from "@/hooks/useLocale";
import { useAuth } from "@/store/auth-slice";
import { type ReactNode } from "react";
import { Navigate } from "react-router";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();
  const locale = useLocale();

  if (user) return <Navigate to={`/${locale}/dashboard`} />;

  return children;
}
