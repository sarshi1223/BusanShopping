import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "釜山逛街筆記｜Busan Shopping Note",
  description: "依區域與種類整理的釜山購物互動攻略，收錄南浦洞、西面田浦、海雲台等地必逛店家與地圖。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
