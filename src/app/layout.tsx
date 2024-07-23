import type { Metadata } from "next";
import localFont from "next/font/local";

// Font files can be colocated inside of `pages`

import "./globals.css";

const brandingSFFont = localFont({
  src: [
    {
      path: "../font/BrandingSF-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/BrandingSF-Light.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/BrandingSF-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});
export const metadata: Metadata = {
  title: "Menu Gross Cafe",
  description: "Menu Gross Cafe",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {" "}
        <script defer src="/index.js"></script>
      </head>
      <body className={brandingSFFont.className}>{children}</body>
    </html>
  );
}
