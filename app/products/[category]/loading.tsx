"use client";

import { theme } from "@/lib/theme-colors";
import { useTheme } from "next-themes";

export default function Loading() {
  const { theme: current } = useTheme();
  const isDark = current === "dark";

  const colors = isDark ? theme.dark : theme.light;
  return (
    <div
      className="flex flex-wrap justify-center gap-6 p-6 bg-[#0d0d0d] min-h-screen"
      style={{ background: colors.background, color: colors.text }}
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="w-[250px] bg-[#1a1a1a] rounded-xl p-4 animate-pulse shadow-md shadow-[#00ffaa]/10"
        >
          <div className="h-40 bg-[#2b2b2b] rounded-md mb-4" />

          <div className="h-4 bg-[#2b2b2b] rounded w-3/4 mb-2" />
          <div className="h-4 bg-[#2b2b2b] rounded w-1/2 mb-4" />

          <div className="h-3 bg-[#2b2b2b] rounded w-full mb-1" />
          <div className="h-3 bg-[#2b2b2b] rounded w-5/6 mb-1" />
          <div className="h-3 bg-[#2b2b2b] rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}
