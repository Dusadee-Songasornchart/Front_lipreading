import React from "react";
import Link from "next/link";

const Btn_Create_guest = (props) => {
  return (
    <Link href="/Guest">
    <button
      className="flex flex-row bg-blue-900 text-white font-[Poppins] py-2 px-4  rounded-md
      md:ml-3 hover:bg-blue-700 text-lg md:text-xl lg:text-2xl font-Poppins  font-bold
      duration-500"
    href="/Guest"
    >
      {props.children}
    </button>
    </Link>
  );
};

export default Btn_Create_guest;