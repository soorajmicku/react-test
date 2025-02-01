import "@/styles/globals.css"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
   
      <Head>
        <title>Mortgage Calculator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A simple mortgage calculator built with Next.js." />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
