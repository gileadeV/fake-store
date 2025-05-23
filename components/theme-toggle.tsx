"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-neon font-medium px-3 py-1 mt-[-5] border border-neon rounded transition text-sm cursor-pointer"
    >
      {theme === "dark" ? "🌙 Escuro" : "☀️ Claro"}
    </button>
  );
}
