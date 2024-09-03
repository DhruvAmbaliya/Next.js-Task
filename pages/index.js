import Head from "next/head";
import { Inter } from "next/font/google";
import style from "../components/layout/Layout.module.css";
import Aside from "@/components/layout/Aside";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home page</title>
        <meta name="description" content="products and clothes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" />
      </Head>
      <main className={style.main}>
        <Aside />
      </main>
    </>
  );
}
