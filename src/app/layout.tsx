/* eslint-disable camelcase */
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";

export const inter = Roboto_Condensed( {
  subsets: ["latin"],
  weight: "400",
} );

export const metadata: Metadata = {
  title: "Zara Web Challenge",
  description: "Zara Web Challenge",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout( { children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
