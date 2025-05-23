"use client";

import { ReactNode } from "react";
import { useTheme } from "next-themes";
import { theme } from "@/lib/theme-colors";

interface MainWrapperProps {
  children: ReactNode;
}

export function MainWrapper({ children }: MainWrapperProps) {
  const { theme: current } = useTheme();
  const isDark = current === "dark";
  const colors = isDark ? theme.dark : theme.light;

  return (
    <main
      className="flex-1 transition-colors duration-300"
      style={{ background: colors.background, color: colors.text }}
    >
      {children}
    </main>
  );
}
