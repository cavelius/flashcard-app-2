import { SWRConfig } from "swr";
import Layout from "../components/Layout.js";
import "../public/global.css";

// diese Datei ist ein Rahmen um die gesamte Anwendung. Sie können es verwenden,
// um gemeinsame Funktionen und Einstellungen zu definieren,
// die auf alle Seiten Ihrer Anwendung angewendet werden sollen.

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 1000,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
