import LocaleLink from "@/components/website/LocaleLink";
import useLocale from "@/hooks/useLocale";
import { useVariables } from "@/store/variables-slice";
import { MenuIcon } from "lucide-react";
import { useEffect } from "react";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const locale = useLocale();
  const { dashSideState, width, setDashSideState } = useVariables();

  useEffect(() => {
    if (width > 1024) {
      setDashSideState(true);
    } else {
      setDashSideState(false);
    }
  }, [setDashSideState, width]);

  return (
    <main className="relative flex min-h-screen flex-col md:flex-row">
      <button
        type="button"
        className="fixed left-3 bottom-3 cursor-pointer bg-gray-300 text-black flex items-center justify-center z-50 rounded  px-3 py-2 text-sm font-medium  md:hidden"
        onClick={() => setDashSideState(!dashSideState)}
      >
        <MenuIcon />
      </button>

      {dashSideState && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setDashSideState(false)}
        />
      )}

      {/* sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-primary p-3 text-white transition-transform duration-200 dark:text-black md:static md:h-screen md:w-64 md:translate-x-0 md:shrink-0 lg:w-72 ${
          dashSideState ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <LocaleLink to={`${locale}/dashboard`}>Dashboard</LocaleLink>
      </aside>

      {/* main content */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </main>
  );
}
