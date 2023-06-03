import { type NextPage } from "next";
import Head from "next/head";
import { FullPage } from "~/components/Layout";
import { ProductList } from "~/features/home/components/ProductList";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <FullPage>
      <ProductList />
    </FullPage>
    </>
  );
};

export default Home;