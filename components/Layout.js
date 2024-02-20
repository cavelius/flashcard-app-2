import Head from "next/head.js";

// Font
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>flashcards</title>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
      </Head>
      {children}
    </>
  );
}
