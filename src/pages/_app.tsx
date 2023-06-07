import * as React from "react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider} from "@supabase/auth-helpers-react";
import type {Session} from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import Navbar from "~/components/Navbar/Navbar";

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
      <Navbar />
      <Component {...pageProps} />
    </SessionContextProvider>
  );
};

export default api.withTRPC(MyApp);
