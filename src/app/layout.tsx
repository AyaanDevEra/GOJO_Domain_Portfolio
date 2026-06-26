import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "GOJO SATORU — Domain Expansion",
  description: "An interactive cinematic experience. Enter the domain.",
  themeColor: "#05060a"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
