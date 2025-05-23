import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { navItems } from "@/constants/data";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "next-themes";
import { MainWrapper } from "@/components/main-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fake Store",
  description: "A real fake store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col min-h-screen">
            <NavBar items={navItems} />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
