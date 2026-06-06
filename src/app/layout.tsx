import type { Metadata } from "next";

import "./globals.css";

const themeScript = `
  (function () {
    try {
      var savedTheme = localStorage.getItem("hcm-museum-theme");
      var theme = savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
      document.documentElement.dataset.theme = theme;
    } catch (_) {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

export const metadata: Metadata = {
  title: "Sự hình thành tư tưởng Hồ Chí Minh 1890-1930",
  description:
    "Bảo tàng số 3D về hành trình hình thành tư tưởng Hồ Chí Minh từ năm 1890 đến năm 1930."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
