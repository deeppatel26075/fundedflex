import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fundedflex.com"),
  title: "FundedFlex | Premium Simulated Funded Trading Accounts",
  description:
    "Trade bigger and prove your edge with FundedFlex. Institutional-grade simulated evaluation accounts with 5% daily drawdown, 10% maximum drawdown, 1:100 leverage, and seamless crypto payments.",
  keywords: [
    "FundedFlex",
    "simulated trading",
    "funded trading account",
    "prop firm evaluation",
    "crypto prop firm",
    "forex evaluation",
    "trade grow freedom",
  ],
  authors: [{ name: "FundedFlex Operations" }],
  openGraph: {
    title: "FundedFlex — TRADE | GROW | FREEDOM",
    description:
      "Premium simulated prop trading accounts. Complete challenges and access simulated funding up to $200,000.",
    url: "https://fundedflex.com",
    siteName: "FundedFlex",
    images: [
      {
        url: "/brand/fundedflex-logo.jpg",
        width: 1200,
        height: 630,
        alt: "FundedFlex Brand Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FundedFlex — TRADE | GROW | FREEDOM",
    description:
      "Premium simulated prop trading accounts with transparent rules and seamless crypto checkout.",
    images: ["/brand/fundedflex-logo.jpg"],
  },
  icons: {
    icon: "/brand/fundedflex-logo.jpg",
    apple: "/brand/fundedflex-logo.jpg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-[#050707] text-[#F8FAFC] min-h-screen flex flex-col selection:bg-[#00E599] selection:text-black antialiased`}
      >
        <Navbar user={user} />
        <main className="flex-grow pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
