"use client";

import Link from "next/link";
import { theme } from "@/lib/theme-colors";
import { useTheme } from "next-themes";

export function Footer() {
  const { theme: current } = useTheme();
  const isDark = current === "dark";

  const colors = isDark ? theme.dark : theme.light;
  return (
    <footer
      className="py-8 border-t border-[#00ffaa]/30"
      style={{ background: colors.background, color: colors.text }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-[#00ffaa] text-xl font-semibold mb-4">
            Fake Store
          </h3>
          <p className="text-sm leading-relaxed">
            Sua loja de demonstração com estilo. Produtos fictícios,
            experiências reais.
          </p>
        </div>

        <div>
          <h4 className="text-[#00ffaa] font-medium mb-3">Institucional</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-[#00ffaa]">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#00ffaa]">
                Carreiras
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#00ffaa]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#00ffaa]">
                Parcerias
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#00ffaa] font-medium mb-3">Ajuda</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-[#00ffaa]">
                Perguntas Frequentes
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#00ffaa]">
                Fale Conosco
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#00ffaa]">
                Rastreamento
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#00ffaa]">
                Trocas e Devoluções
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#00ffaa] font-medium mb-3">Contato</h4>
          <ul className="text-sm space-y-2">
            <li>Email: suporte@fakestore.dev</li>
            <li>Tel: (11) 99999-0000</li>
            <li>Seg a Sex, 9h às 18h</li>
          </ul>
        </div>
      </div>

      <div
        className="border-t border-[#00ffaa]/10 mt-10 pt-4 text-center text-sm"
        style={{ background: colors.background, color: colors.text }}
      >
        &copy; {new Date().getFullYear()} Fake Store. Todos os direitos
        fictícios reservados.
      </div>
    </footer>
  );
}
