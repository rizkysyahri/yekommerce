import { useRouter } from "next/router";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuScale } from "iconoir-react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function MenuList() {
  const supabase = useSupabaseClient();
  const user = useUser();

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const router = useRouter();

  return (
    <div className="m-5 flex justify-between py-2 font-mono">
      {user ? (
        <div className="relative drop-shadow-2xl">
          <Popover>
            {({ open }: { open: boolean }) => (
              <>
                <Popover.Button
                  className={`
                  ${open ? "" : "text-opacity-80"}
                  group inline-flex
                  items-center rounded-md bg-white text-base font-medium text-gray-700 transition
                  duration-150 ease-in-out hover:text-opacity-100 focus:outline-none
                  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                `}
                >
                  <MenuScale
                    className={`
                    ${open ? "" : "text-opacity-70"}
                    ml-3 h-5 w-5 text-gray-500 transition
                    duration-150 ease-in-out group-hover:text-opacity-80
                  `}
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition duration-200 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    className="absolute right-0 z-10 mt-2 w-36 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-slate-100 ring-opacity-5"
                  >
                    <div className="py-1">
                      <span className="pr-1 block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Profile</span>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      ) : (
        <button className="px-4 py-2 bg-black text-white" onClick={login}>
          Login
        </button>
      )}
    </div>
  );
}
