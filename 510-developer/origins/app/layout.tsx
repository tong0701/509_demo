import type { Metadata } from "next";
import { DM_Sans, Fraunces, Literata } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Origins — Life stories",
  description:
    "An AI-powered interviewer to capture the memories of the people you love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} ${literata.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--origins-cream)] font-sans">
        {children}
      </body>
    </html>
  );
}
