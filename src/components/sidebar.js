import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useCallback, useState } from "react";
import MyWorkSpace from "./my_workspace";
import Notify_compo from "./Notify";
import { useAuth } from "@/context/AuthContext";

const Sidebar = ({ isSidebarOpen, Team }) => {
  const router = useRouter();
  const { token } = useAuth();

  const user = token;
  console.log("bar", isSidebarOpen);

  const defaultValues = {
    user: user,
  };

  const handdleCreateTeam = () => {
    toCreateTeam();
  };

  const toCreateTeam = useCallback(() => {
    router.push({
      pathname: "CreateTeam",
    });
  }, [router]);

  const extractImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_TEAM_IMAGE+fullPath
    console.log(newPath)
    return newPath;
  };

  const toTeam = useCallback((teamid) => {
    // Log the teamid before the reload
    console.log("sidebar", teamid);

    // Change the query parameter using router.replace
    router.replace({
      pathname: "/User/Team",
      query: { team_id: teamid },
    });

  }, [router]);
  const sidebarClass = `fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full ${
    isSidebarOpen ? "md:translate-x-0" : "md:-translate-x-full"
  }`;

  return (
    <div id="default-sidebar" className={sidebarClass} aria-label="Sidebar">
      <div className="h-full overflow-y-auto bg-blue-50 border-r-4 border-blue-900 mt-[4.5rem]">
        <div className="flex justify-between border-b-2 border-slate-900 px-3 py-2">
          <div className="font-bold text-xl mt-1">Team</div>
          <svg
            width="27"
            height="25"
            viewBox="0 0 27 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1"
          >
            <path
              d="M17.3469 21.608C18.4404 21.9244 19.5734 22.0845 20.7121 22.0833C22.5433 22.086 24.3508 21.6698 25.9953 20.8669C26.0439 19.7216 25.7166 18.5918 25.063 17.6486C24.4094 16.7054 23.4651 16.0003 22.3732 15.6401C21.2814 15.28 20.1015 15.2844 19.0124 15.6528C17.9233 16.0211 16.9844 16.7333 16.3379 17.6814M17.3469 21.608V21.6041C17.3469 20.182 16.9802 18.8442 16.3379 17.6814M17.3469 21.608V21.7434C14.8796 23.2245 12.053 24.0048 9.17279 24C6.18443 24 3.38838 23.1758 1.00128 21.7434L1 21.6041C0.999017 19.7954 1.60205 18.0378 2.71402 16.6084C3.82599 15.179 5.38366 14.1591 7.14144 13.7095C8.89921 13.26 10.7571 13.4063 12.4222 14.1254C14.0874 14.8446 15.465 16.0956 16.3379 17.6814M13.5008 5.3125C13.5008 6.45624 13.045 7.55314 12.2336 8.36189C11.4221 9.17064 10.3216 9.62499 9.17407 9.62499C8.02654 9.62499 6.92601 9.17064 6.11458 8.36189C5.30316 7.55314 4.8473 6.45624 4.8473 5.3125C4.8473 4.16875 5.30316 3.07185 6.11458 2.2631C6.92601 1.45435 8.02654 1 9.17407 1C10.3216 1 11.4221 1.45435 12.2336 2.2631C13.045 3.07185 13.5008 4.16875 13.5008 5.3125ZM24.0774 8.18749C24.0774 9.07707 23.7228 9.93022 23.0917 10.5592C22.4606 11.1883 21.6046 11.5417 20.7121 11.5417C19.8196 11.5417 18.9636 11.1883 18.3325 10.5592C17.7014 9.93022 17.3469 9.07707 17.3469 8.18749C17.3469 7.29791 17.7014 6.44477 18.3325 5.81574C18.9636 5.18671 19.8196 4.83333 20.7121 4.83333C21.6046 4.83333 22.4606 5.18671 23.0917 5.81574C23.7228 6.44477 24.0774 7.29791 24.0774 8.18749Z"
              fill="#B91C1C"
            />
            <path
              d="M17.3469 21.608C18.4404 21.9244 19.5734 22.0845 20.7121 22.0833C22.5433 22.086 24.3508 21.6698 25.9953 20.8669C26.0439 19.7216 25.7166 18.5918 25.063 17.6486C24.4094 16.7054 23.4651 16.0003 22.3732 15.6401C21.2814 15.28 20.1015 15.2844 19.0124 15.6528C17.9233 16.0211 16.9844 16.7333 16.3379 17.6814M17.3469 21.608V21.6041C17.3469 20.182 16.9802 18.8442 16.3379 17.6814M17.3469 21.608V21.7434C14.8796 23.2245 12.053 24.0048 9.17279 24C6.18443 24 3.38838 23.1758 1.00128 21.7434L1 21.6041C0.999017 19.7954 1.60205 18.0378 2.71402 16.6084C3.82599 15.179 5.38366 14.1591 7.14144 13.7095C8.89921 13.26 10.7571 13.4063 12.4222 14.1254C14.0874 14.8446 15.465 16.0956 16.3379 17.6814M13.5008 5.3125C13.5008 6.45624 13.045 7.55314 12.2336 8.36189C11.4221 9.17064 10.3216 9.62499 9.17407 9.62499C8.02654 9.62499 6.92601 9.17064 6.11458 8.36189C5.30316 7.55314 4.8473 6.45624 4.8473 5.3125C4.8473 4.16875 5.30316 3.07185 6.11458 2.2631C6.92601 1.45435 8.02654 1 9.17407 1C10.3216 1 11.4221 1.45435 12.2336 2.2631C13.045 3.07185 13.5008 4.16875 13.5008 5.3125ZM24.0774 8.18749C24.0774 9.07707 23.7228 9.93022 23.0917 10.5592C22.4606 11.1883 21.6046 11.5417 20.7121 11.5417C19.8196 11.5417 18.9636 11.1883 18.3325 10.5592C17.7014 9.93022 17.3469 9.07707 17.3469 8.18749C17.3469 7.29791 17.7014 6.44477 18.3325 5.81574C18.9636 5.18671 19.8196 4.83333 20.7121 4.83333C21.6046 4.83333 22.4606 5.18671 23.0917 5.81574C23.7228 6.44477 24.0774 7.29791 24.0774 8.18749Z"
              stroke="#B91C1C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <ul className="space-y-2 font-medium px-3 mt-4">
          {Team.map((team, index) => (
            <li key={index} className="flex ">
              <button
                className="flex-1 flex-rows"
                onClick={() => toTeam(team.team_id)}
              >
                <div className="bg-white flex justify-between px-3 py-1 rounded-md border-blue-900 border-2 w-full">
                  <div className="text-lg">{team.team_name}</div>
                  <img
                    className="h-7 w-7  fill-red-300 "
                    src={extractImagePath(team.image_path)}
                    alt="SVG Image"
                  />
                </div>
              </button>
            </li>
          ))}
          <div className="grid justify-items-center">
            <button
              className="mt-3 ml-1 bg-white flex justify-between px-5 py-2 rounded-xl border-red-600 border-2 "
              onClick={handdleCreateTeam}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rounded-md fill-red-600 "
              >
                <path
                  d="M21.0833 0H1.91667C1.40833 0 0.920823 0.201934 0.561379 0.561379C0.201934 0.920823 0 1.40833 0 1.91667V21.0833C0 21.5917 0.201934 22.0792 0.561379 22.4386C0.920823 22.7981 1.40833 23 1.91667 23H21.0833C21.5917 23 22.0792 22.7981 22.4386 22.4386C22.7981 22.0792 23 21.5917 23 21.0833V1.91667C23 1.40833 22.7981 0.920823 22.4386 0.561379C22.0792 0.201934 21.5917 0 21.0833 0ZM18.2083 12.4583H12.4583V18.2083C12.4583 18.4625 12.3574 18.7063 12.1776 18.886C11.9979 19.0657 11.7542 19.1667 11.5 19.1667C11.2458 19.1667 11.0021 19.0657 10.8224 18.886C10.6426 18.7063 10.5417 18.4625 10.5417 18.2083V12.4583H4.79167C4.5375 12.4583 4.29375 12.3574 4.11402 12.1776C3.9343 11.9979 3.83333 11.7542 3.83333 11.5C3.83333 11.2458 3.9343 11.0021 4.11402 10.8224C4.29375 10.6426 4.5375 10.5417 4.79167 10.5417H10.5417V4.79167C10.5417 4.5375 10.6426 4.29375 10.8224 4.11402C11.0021 3.9343 11.2458 3.83333 11.5 3.83333C11.7542 3.83333 11.9979 3.9343 12.1776 4.11402C12.3574 4.29375 12.4583 4.5375 12.4583 4.79167V10.5417H18.2083C18.4625 10.5417 18.7063 10.6426 18.886 10.8224C19.0657 11.0021 19.1667 11.2458 19.1667 11.5C19.1667 11.7542 19.0657 11.9979 18.886 12.1776C18.7063 12.3574 18.4625 12.4583 18.2083 12.4583Z"
                  // fill="#DC2626"
                />
              </svg>
              <div className="text-lg font-bold ml-3 ">Create Team</div>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
