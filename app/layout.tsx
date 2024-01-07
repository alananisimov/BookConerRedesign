import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Книжный уголок - Самый уютный магазин книг",
  description:
    "Книги - это эмоции, новые ощущения, знания и конечно же удовольствие",
  metadataBase: new URL("http://localhost:3000"),
  icons: "/book.jpg",
};
export const viewport: Viewport = {
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-blue-50 via-white to-sky-100" />
        <Toaster />

        <Nav />

        <main className="flex min-h-screen w-full flex-col py-32 z-10">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
