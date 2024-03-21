import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { token } = useAuth();
  const router = useRouter();

  const toWebAdminUser = useCallback(() => {
    router.push({
      pathname: "WebAdmin/User",
    });
  }, [router]);
  const toWebAdminTeam = useCallback(() => {
    router.push({
      pathname: "WebAdmin/Team",
    });
  }, [router]);

  useEffect(() => {
    if (token === "null" || token === null) {
      console.log("ok")
      router.push({
        pathname: "/",
      });
    }
  });

  return (
    <div>
      <Head>
        <style>
          {`
         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=Oswald:wght@500&family=Poppins&family=Raleway:wght@100;600;700&display=swap');
        `}
        </style>
      </Head>
      <div>
        
        <div className="bg-blue-200 w-full px-16 md:px-0 h-screen flex items-center justify-center font-Poppins">
          <div className="grid justify-items-center ">
            <div className="flex flex-rows mb-[5rem] text-4xl font-bold text-blue-900 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              <p>Where do you go ?</p>
            </div>
            <div className="flex justify-between">
              <button
                className="px-8 py-10 bg-white  rounded-md drop-shadow-md text-3xl font-bold 
              duration-100 hover:scale-105 hover:bg-blue-50"
                onClick={() => toWebAdminUser()}
              >
                User
              </button>
              <button
                className="ml-12 px-8 py-10 bg-white  rounded-md drop-shadow-md text-3xl font-bold
              duration-100 hover:scale-105 hover:bg-blue-50"
                onClick={() => toWebAdminTeam()}
              >
                Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
