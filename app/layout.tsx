import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Online Orders",
  description: "Simple online ordering app for pickup and drive-through orders."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
