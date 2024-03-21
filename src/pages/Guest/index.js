import Navbar from "@/components/Navbar";
import U_guest from "@/components/U_guest";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";

const  Index = () => {


  return (
    <div>
      <Head>
        <style>
          {`
           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=Oswald:wght@500&family=Poppins&family=Raleway:wght@100;600;700&display=swap');
          `}
        </style>
      </Head>
      <div className="flex flex-col mt-[4.5rem]">
        <div>
          <Navbar/>
        </div>
        <div className="flex justify-center text-3xl md:text-4xl lg:text-6xl font-Poppins font-bold text-blue-900 mt-14 z-[-2]">
          Create Your&nbsp;<span className="text-red-500">Subtitle</span>
        </div>
        <div className="flex justify-center text-lg md:text-xl lg:text-3xl font-Poppins font-bold text-blue-900 md:mt-4 z-[-2]">
          describe Subtitle
        </div>
        <U_guest></U_guest>
        <div className="bg-gradient-to-b from-blue-900 to-blue-600 border-4 border-blue-900 flex flex-col mt-12 md:mt-10">
          <div className="text-3xl md:text-4xl  text-white font-Poppins font-bold px-10 mt-9 mb-2 ">
            How to {"  "} <span className="text-red-500">use</span>
          </div>
          <div className="leading-relaxed md:leading-relaxed lg:leading-relaxed whitespace-break-spaces text-left text-lg md:text-xl   px-11 text-white font-Poppins mt-3 ">
            {"       "}You can upload a video file with a maximum size of 500 megabytes by clicking on the square with the text 
          </div>
          <div className="h-[7rem]">

          </div>
        </div>
      </div>
    </div>
  );
}
export default Index;
