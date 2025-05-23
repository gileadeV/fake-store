"use client";

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { theme } from "@/lib/theme-colors";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme: current } = useTheme();
  const isDark = current === "dark";

  const colors = isDark ? theme.dark : theme.light;

  return (
    <main
      className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6"
      style={{ background: colors.background, color: colors.text }}
    >
      <div className="text-center max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#00ffaa] mb-6">
          Bem-vindo à Fake Store
        </h1>

        <p
          className="text-[#d1fce6] text-xl sm:text-2xl font-medium"
          style={{ background: colors.background, color: colors.text }}
        >
          <Typewriter
            words={[
              "Produtos incríveis.",
              "Ofertas irreais.",
              "Experiência futurista.",
              "Compre como se fosse verdade.",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </p>

        <div className="mt-10">
          <Link
            href="/products/all"
            className="inline-block bg-[#00ffaa] text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition"
          >
            Explorar Produtos
          </Link>
        </div>
      </div>
    </main>
  );
}
