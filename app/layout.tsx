import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quemeusou-teste.vercel.app"),
  title: "Quem eu sou? | Perfil comportamental",
  description:
    "Descubra o animal do seu jeito de pensar. Teste de dominância cerebral de Ned Herrmann: Tubarão, Lobo, Águia ou Gato.",
  openGraph: {
    title: "Quem eu sou?",
    description: "Um mapa do seu jeito de pensar, decidir e se relacionar.",
    locale: "pt_BR",
    type: "website",
    url: "https://quemeusou-teste.vercel.app",
    siteName: "Quem eu sou?",
    images: [
      {
        url: "/og-quem-eu-sou.jpg",
        width: 1024,
        height: 1024,
        alt: "Quem eu sou?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quem eu sou?",
    description: "Um mapa do seu jeito de pensar, decidir e se relacionar.",
    images: ["/og-quem-eu-sou.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
