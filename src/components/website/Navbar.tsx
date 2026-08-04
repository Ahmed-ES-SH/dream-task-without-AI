import { useAuth } from "@/store/auth-slice";
import { Button } from "../ui/button";
import LocaleLink from "./LocaleLink";
import ThemeToggle from "./ThemeToggle";
import UserButton from "./UserButton";
import { Link } from "react-router";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="w-full h-14 flex z-99 relative items-center justify-center bg-gray-50/50 backdrop-blur-md">
      <div className="flex items-center justify-between container mx-auto px-2">
        {/* logo */}
        <Link to={"/"} className="font-bold text-2xl">
          Dream
        </Link>

        <div className="flex items-center gap-1 z-99 relative">
          <ThemeToggle />
          {/* actions  */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <LocaleLink to={"/login"}>
                <Button>Login</Button>
              </LocaleLink>
            </div>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </header>
  );
}
