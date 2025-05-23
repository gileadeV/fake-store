"use client";

import Link from "next/link";
import { useState } from "react";
import { NavBarItems } from "@/types/types";
import { ThemeToggle } from "./theme-toggle";
import { theme } from "@/lib/theme-colors";
import { useTheme } from "next-themes";
import { useIsTablet } from "@/app/hooks/use-is-tablet";

export function NavBar({ items }: { items: NavBarItems[] }) {
  const isTablet = useIsTablet();
  const [open, setOpen] = useState(false);

  const { theme: current } = useTheme();
  const isDark = current === "dark";

  const colors = isDark ? theme.dark : theme.light;

  return (
    <nav
      style={{ background: colors.background, color: colors.text }}
      className="border-b border-[#00ffaa]/30"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/home" className="text-2xl font-bold text-[#00ffaa]">
          Fake Store
        </Link>

        {isTablet && (
          <button
            className="text-[#00ffaa] text-2xl"
            onClick={() => setOpen((prev) => !prev)}
          >
            ☰
          </button>
        )}
      </div>

      {/* Menu lateral (tablet/mobile) */}
      {isTablet && open && (
        <div
          className="bg-[#1a1a1a] px-6 py-4"
          style={{ background: colors.background, color: colors.text }}
        >
          <ul className="flex flex-col gap-4">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="block text-[#d1fce6] hover:text-[#00ffaa] transition"
                  style={{ background: colors.background, color: colors.text }}
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <div>
              <ThemeToggle />
            </div>
          </ul>
        </div>
      )}

      {/* Menu horizontal (desktop) */}
      {!isTablet && (
        <div className="flex justify-center px-6">
          <ul className="flex flex-wrap gap-8 py-2 px-10 justify-center text-sm font-medium">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="hover:text-[#00ffaa] transition"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <ThemeToggle />
          </ul>
        </div>
      )}
    </nav>
  );
}
