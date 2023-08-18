import * as React from "react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, type Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import Navbar from "~/components/Navbar/Navbar";
import { Roboto } from "@next/font/google";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400'],

});

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) => {
  const [supabaseClient] = React.useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <main className={roboto.className}>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </SessionContextProvider>
  );
};

export default api.withTRPC(MyApp);
