import type { Metadata } from "next";
import { Averia_Serif_Libre } from "next/font/google";
import "./globals.css";

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
        <main className="bg-gray-100 min-h-screen">
          <nav className="w-full bg-white h-16 flex items-center justify-center">
            <section className="container flex items-center">
              <h1 className="font-bold text-2xl">InfoMundi</h1>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
