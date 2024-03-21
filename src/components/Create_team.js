import React, { useCallback } from "react";
import { useRouter } from "next/router";

const Create_team = () => {
  const router = useRouter();

  const toCreateTeam = useCallback(() => {
    router.push({
      pathname : "User/CreateTeam"
     
    });
  }, [router]);

  const handleClick = () => {
    toCreateTeam();
  };
  return (
    <div>
      <button
        id="Create_team"
        className="flex justify-center items-center flex-col w-[20rem] md:w-[40rem]  h-[10rem] md:h-[20rem] 
        bg-clip-border p-6 bg-slate-100 border-2 md:border-4 border-blue-900 border-dashed rounded-md"
        onClick={handleClick}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 85 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            width="84.8485"
            height="80"
            rx="10"
            fill="#1E3A8A"
          />
          <path
            d="M42.0203 19.394V59.7981M62.2223 39.5961H21.8182"
            stroke="#FDFDFE"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="font-Poppins text-blue-900 text-lg md:text-xl lg:text-2xl font-bold mt-3">
          Create your team
        </div>
      </button>
    </div>
  );
};

export default Create_team;
