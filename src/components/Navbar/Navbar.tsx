import * as React from 'react';
import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const Navbar = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut().catch((error) => {
      console.error(" Error occurred during sign out:", error);
    });
  };

  return (
    <div className="navbar flex items-center justify-between bg-slate-600 ">
      <div className="flex-1">
        <Link
          href="/"
          className="p-2 text-xl font-semibold normal-case"
          
        >
          Yekommerce
        </Link>
      </div>
      {user ? (
        <div className="flex-none">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn-primary btn-block btn">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img alt="user" src={user?.user_metadata?.avatar_url as string} width={30} />
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
          className="rounded bg-black p-2 px-4 py-2 text-white"
          onClick={login}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
