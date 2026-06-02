import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sự hình thành tư tưởng Hồ Chí Minh 1911-1930",
  description:
    "Bảo tàng số 3D về hành trình hình thành tư tưởng Hồ Chí Minh từ năm 1911 đến năm 1930."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
