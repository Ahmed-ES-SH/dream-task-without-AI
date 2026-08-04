import { RouterProvider } from "react-router";
import { routes } from "./routes";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/axios";
import { AUTH_API } from "./constants/auth.api";
import { ACCESS_TOKEN_KEY } from "./constants/auth-keys";
import { useAuth } from "./store/auth-slice";
import { Loader } from "lucide-react";
import { useVariables } from "./store/variables-slice";
import "./App.css";

export default function App() {
  const { setUser, clearAuth } = useAuth();
  const { setWidth } = useVariables();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (!token) {
        clearAuth();
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.get(AUTH_API.ME);
        const user = response.data.data;
        setUser(user);
      } catch (error) {
        console.log(error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [clearAuth, setUser]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader size={72} className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
