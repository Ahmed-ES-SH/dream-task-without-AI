import { ACCESS_TOKEN_KEY } from "@/constants/auth-keys";
import useLocale from "@/hooks/useLocale";
import { useAuth } from "@/store/auth-slice";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

interface DashboardGuardProps {
  children: ReactNode;
}

export default function DashboardGuard({ children }: DashboardGuardProps) {
  const navigate = useNavigate();
  const locale = useLocale();

  const { isAuthenticated } = useAuth();

  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!token || !isAuthenticated) navigate(`/${locale}/login`);

  return children;
}
