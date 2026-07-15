import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NIF CHRIF | Parfumerie Marocaine de Luxe",
  description: "Maison de parfumerie marocaine de luxe, entre hammam, Sahara et ateliers de Grasse."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
