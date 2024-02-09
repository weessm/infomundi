import type { Metadata } from "next";
import { Averia_Serif_Libre } from "next/font/google";
import "./globals.css";
import HeaderComponent from "../components/Header";

const averiaSerifLibre = Averia_Serif_Libre({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InfoMundi",
  description:
    "InfoMundi é a ferramenta ideal para quem busca conhecimento sobre diferentes países e regiões do globo.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={averiaSerifLibre.className}>
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
          <header className="w-full">
            <HeaderComponent />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
