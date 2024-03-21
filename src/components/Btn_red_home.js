import React from "react";
import Link from "next/link";

const Btn_red_home = (props) => {
  return (
    <Link href="/Guest">
    <button
      className="bg-red-700 text-white font-[Poppins] py-4 px-8  rounded-full
    lg:ml-10  hover:bg-red-400 text-lg md:text-2xl lg:text-3xl font-Poppins  font-bold
    duration-500"
    href="/Guest"
    >
      {props.children}
    </button>
    </Link>
  );
};

export default Btn_red_home;
