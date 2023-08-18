import * as React from "react";
import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { api } from "~/utils/api";
import CartButton from "./CartButton";

const Navbar = () => {
  // const [isUser, setUser]  = React.useState({})
  const supabase = useSupabaseClient();
  const user = useUser();

  const { data: cart } = api.cart.getCart.useQuery(undefined, {
    staleTime: 1000 * 60
  });

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  // React.useEffect(() => {
  //   async function getUserData() {
  //     await supabase.auth.getUser().then((value) => {
  //       if (value.data.user) {
  //         console.log(value.data.user)
  //         setUser(value.data.user)
  //       }
  //     })
  //   }
  //   getUserData()
  // }, [])

  return (
    <div className="navbar flex items-center justify-between bg-slate-600">
      <div className="flex-1">
        <Link href="/" className="p-1 text-xl font-semibold normal-case">
          Yekommerce
        </Link>
      </div>
      {user ? (
        <div className="z-10 flex-none">
          <CartButton itemCount={cart?.length || 0}/>
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img
                  alt="user"
                  src={user?.user_metadata?.avatar_url as string}
                  width={30}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="w-50 dropdown-content menu rounded-box menu-sm mt-3 bg-base-content p-2 shadow"
            >
              <Link href="/profile" className="py-2" passHref>
                <span className="badge justify-between">Profile</span>
              </Link>
              <button className="badge" onClick={logout}>
                Logout
              </button>
            </ul>
          </div>{" "}
        </div>
      ) : (
        <button
          className="rounded bg-black px-4 py-2 text-white"
          onClick={login}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
