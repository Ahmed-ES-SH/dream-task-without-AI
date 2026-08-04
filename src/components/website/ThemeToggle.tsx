import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {theme == "light" ? (
        <button className="cursor-pointer" onClick={() => setTheme("dark")}>
          <Moon size={20} />
        </button>
      ) : (
        <button className="cursor-pointer" onClick={() => setTheme("light")}>
          <Sun size={20} />
        </button>
      )}
    </>
  );
}
