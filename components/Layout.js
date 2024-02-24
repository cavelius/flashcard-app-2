import Head from "next/head.js";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>flashcards</title>
      </Head>
      {children}
    </>
  );
}
