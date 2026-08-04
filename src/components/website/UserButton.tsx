import { AUTH_API } from "@/constants/auth.api";
import useLocale from "@/hooks/useLocale";
import { apiClient } from "@/lib/axios";
import { useAuth } from "@/store/auth-slice";
import { Loader, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import LocaleLink from "./LocaleLink";
import { REFRESH_TOKEN_KEY } from "@/constants/auth-keys";

export default function UserButton() {
  const { user, clearAuth } = useAuth();

  const navigate = useNavigate();
  const locale = useLocale();

  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) return;

  const logout = async () => {
    try {
      setLoading(true);
      const refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY);
      const response = await apiClient.post(AUTH_API.LOGOUT, { refresh_token });
      if (response.status == 200) {
        clearAuth();
        setOpenMenu(false);
        navigate(`/${locale}/login`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setOpenMenu(!openMenu)}
      className="w-9 h-9 z-99  relative cursor-pointer flex items-center justify-center  rounded-full border border-gray-300 shadow-md"
    >
      {user.avatar_url ? (
        <img
          src={user.avatar_url}
          alt="user-image"
          className="object-cover rounded-full"
        />
      ) : (
        <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded-full">
          <User className="text-gray-400" />
        </div>
      )}

      {/* menu */}
      {openMenu && (
        <div className="w-32 h-16  rounded-md bg-primary text-white dark:text-black z-99 absolute top-full mt-2 left-0">
          <div className="flex flex-col items-start gap-2 p-2">
            <LocaleLink className="hover:ml-1 duration-300" to="/dashboard">
              Dashboard
            </LocaleLink>
            <div
              onClick={logout}
              className="text-red-400 hover:text-red-500 duration-300"
            >
              {loading ? <Loader className="animate-spin" /> : "Logout"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
