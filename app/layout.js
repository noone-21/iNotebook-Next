import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import BootstrapClient from "@/components/bootstrap/BootstrapClient";

import { getServerSession } from "next-auth";

import SessionProvider from "@/store/SessionProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iNotebook",
  description: "Your very own, safe and secure notes app.",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />

          {children}
          <BootstrapClient />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
