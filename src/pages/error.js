import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

const error = () => {
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
        <div className="bg-blue-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
          <div className="bg-white border border-blue-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
            <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-blue-300">
              404
            </p>
            <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-blue-900 mt-4">
              Page Not Found
            </p>
            <p className="text-blue-500 mt-4 pb-4 border-b-2 text-center">
              Sorry, the page you are looking for could not be found.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default error;
