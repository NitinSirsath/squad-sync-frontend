import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme = systemPrefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      document.documentElement.setAttribute("data-theme", defaultTheme);
    }
  }, []);

  return (
    <div
      className={cn(
        "transition-colors duration-300",
        theme === "dark" ? "dark-mode" : "light-mode"
      )}
    >
      {children}
    </div>
  );
};

export default ThemeWrapper;
