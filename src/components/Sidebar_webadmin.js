import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import MyWorkSpace from "./my_workspace";
import Notify_compo from "./Notify";
import { useAuth } from "@/context/AuthContext";

const Sidebar_Webadmin = () => {
  const router = useRouter();
  const { token } = useAuth();
  const [user, setUser] = useState(false);
  const [team, setTeam] = useState(false);

  const currentPath = router.pathname;

  const toWebAdminUser = useCallback(() => {
    if (currentPath !== "/WebAdmin/User") {
      router.push({
        pathname: "/WebAdmin/User",
      });
    } else {
      router.reload();
    }
  }, [router]);

  const toWebAdminTeam = useCallback(() => {
    if (currentPath !== "/WebAdmin/Team") {
      router.push({
        pathname: "/WebAdmin/Team",
      });
    } else {
      router.reload();
    }
  }, [router]);

  useEffect(() => {
    if (currentPath === "/WebAdmin/User") {
      setUser(true);
      console.log(user);
    } else if (currentPath === "/WebAdmin/Team") {
      setTeam(true);
      console.log(team);
    }
  }, []);

  return (
    <div
      id="default-sidebar"
      className={
        "fixed top-0 left-0 w-auto h-screen transition-transform translate-x-0 mt-3 bg-sky-50"
      }
      aria-label="Sidebar"
    >
      <div className=" h-full overflow-y-auto  border-blue-900 mt-[4.5rem]">
        <button
          className={`px-8 py-3 ml-2 mr-2 grid justify-items-center rounded-md drop-shadow-md 
          mt-5 duration-100 hover:scale-105 hover:bg-blue-50 ${
            user ? "bg-blue-100 border-2 border-blue-900" : "bg-white"
          }`}
          onClick={toWebAdminUser}
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`mb-2 fill-blue-900`}
          >
            <g clipPath="url(#clip0_648_506)">
              <path d="M17.5 0.000380365C16.4117 -0.0256436 15.3292 0.166229 14.3162 0.564711C13.3031 0.963194 12.38 1.56024 11.6011 2.32073C10.8223 3.08121 10.2033 3.98979 9.78073 4.993C9.35814 5.99621 9.14045 7.0738 9.14045 8.16238C9.14045 9.25096 9.35814 10.3286 9.78073 11.3318C10.2033 12.335 10.8223 13.2435 11.6011 14.004C12.38 14.7645 13.3031 15.3616 14.3162 15.76C15.3292 16.1585 16.4117 16.3504 17.5 16.3244C18.5882 16.3504 19.6707 16.1585 20.6837 15.76C21.6968 15.3616 22.6199 14.7645 23.3988 14.004C24.1777 13.2435 24.7966 12.335 25.2192 11.3318C25.6418 10.3286 25.8595 9.25096 25.8595 8.16238C25.8595 7.0738 25.6418 5.99621 25.2192 4.993C24.7966 3.98979 24.1777 3.08121 23.3988 2.32073C22.6199 1.56024 21.6968 0.963194 20.6837 0.564711C19.6707 0.166229 18.5882 -0.0256436 17.5 0.000380365ZM12.8333 20.9864C10.6674 20.9864 8.59013 21.8468 7.05859 23.3783C5.52704 24.9099 4.66663 26.9871 4.66663 29.153V34.9794H30.3333V29.153C30.3333 26.9871 29.4729 24.9099 27.9413 23.3783C26.4098 21.8468 24.3326 20.9864 22.1666 20.9864H12.8333Z" />
            </g>
            <defs>
              <clipPath id="clip0_648_506">
                <rect width="35" height="35" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Users
        </button>

        <button
          className={`px-8 py-3 ml-2 mr-2 grid justify-items-center rounded-md drop-shadow-md 
          mt-5 duration-100 hover:scale-105 hover:bg-blue-50 ${
            team ? "bg-blue-100 border-2 border-blue-900" : "bg-white"
          }`}
          onClick={toWebAdminTeam}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-blue-900"
          >
            <path d="M22.6072 8.03557C22.6072 9.21958 22.1368 10.3551 21.2996 11.1923C20.4624 12.0295 19.3269 12.4999 18.1429 12.4999C16.9589 12.4999 15.8234 12.0295 14.9862 11.1923C14.1489 10.3551 13.6786 9.21958 13.6786 8.03557C13.6786 6.85157 14.1489 5.71606 14.9862 4.87885C15.8234 4.04163 16.9589 3.57129 18.1429 3.57129C19.3269 3.57129 20.4624 4.04163 21.2996 4.87885C22.1368 5.71606 22.6072 6.85157 22.6072 8.03557ZM31.5358 8.92843C31.5358 9.87563 31.1595 10.784 30.4897 11.4538C29.8199 12.1236 28.9115 12.4999 27.9643 12.4999C27.0171 12.4999 26.1087 12.1236 25.4389 11.4538C24.7692 10.784 24.3929 9.87563 24.3929 8.92843C24.3929 7.98123 24.7692 7.07282 25.4389 6.40305C26.1087 5.73328 27.0171 5.357 27.9643 5.357C28.9115 5.357 29.8199 5.73328 30.4897 6.40305C31.1595 7.07282 31.5358 7.98123 31.5358 8.92843ZM8.32146 12.4999C9.26867 12.4999 10.1771 12.1236 10.8468 11.4538C11.5166 10.784 11.8929 9.87563 11.8929 8.92843C11.8929 7.98123 11.5166 7.07282 10.8468 6.40305C10.1771 5.73328 9.26867 5.357 8.32146 5.357C7.37426 5.357 6.46585 5.73328 5.79608 6.40305C5.12631 7.07282 4.75003 7.98123 4.75003 8.92843C4.75003 9.87563 5.12631 10.784 5.79608 11.4538C6.46585 12.1236 7.37426 12.4999 8.32146 12.4999ZM11 16.5177C11 15.2856 12 14.2856 13.2322 14.2856H23.0536C24.2857 14.2856 25.2858 15.2856 25.2858 16.5177V24.9999C25.2857 26.8943 24.5332 28.7111 23.1937 30.0506C21.8541 31.3902 20.0373 32.1427 18.1429 32.1427C16.2485 32.1427 14.4317 31.3902 13.0921 30.0506C11.7526 28.7111 11 26.8943 11 24.9999V16.5177ZM9.21432 16.5177C9.21432 15.6909 9.46432 14.9249 9.89111 14.2856H6.08932C4.85718 14.2856 3.85718 15.2856 3.85718 16.5177V23.2141C3.85709 23.9786 4.02064 24.7343 4.33682 25.4304C4.65301 26.1264 5.11451 26.7467 5.69031 27.2496C6.26612 27.7525 6.94289 28.1264 7.67515 28.346C8.40742 28.5657 9.17821 28.626 9.93575 28.5231C9.45798 27.41 9.21249 26.2111 9.21432 24.9999V16.5177ZM27.0715 24.9999C27.0715 26.2499 26.8143 27.4427 26.35 28.5231C27.1076 28.626 27.8784 28.5657 28.6106 28.346C29.3429 28.1264 30.0197 27.7525 30.5955 27.2496C31.1713 26.7467 31.6328 26.1264 31.949 25.4304C32.2651 24.7343 32.4287 23.9786 32.4286 23.2141V16.5177C32.4286 15.2856 31.4286 14.2856 30.1965 14.2856H26.3947C26.8233 14.9249 27.0715 15.6909 27.0715 16.5177V24.9999Z" />
          </svg>
          Team
        </button>
      </div>
    </div>
  );
};

export default Sidebar_Webadmin;
