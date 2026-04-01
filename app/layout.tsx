import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Restaurant Online Orders",
  description: "Customer online ordering site"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="header-inner">
            <div className="logo-wrap">
              <Image src="/logo.svg" alt="Restaurant logo" width={120} height={84} priority />
              <div>
                <p className="brand-kicker">Online Ordering</p>
                <h1 className="brand-name">Fresh Pickup Orders</h1>
              </div>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
