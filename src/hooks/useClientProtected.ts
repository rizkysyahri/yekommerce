import * as React from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const useClientProtected = () => {
  const user = useUser();
  const supabase = useSupabaseClient();

  const router = useRouter();

  React.useEffect(() => {
    async function checkSessions() {
      const session = await supabase.auth.getSession();

      if (!session.data.session) {
        void router.push("/");
      }
    }

    void checkSessions();
  }, [user, router, supabase.auth]);
};
