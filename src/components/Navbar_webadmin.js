import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const Navbar_webadmin = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const toSignOut = () => {
    toSignin();
    logout();
    //waiting for ton
    // const api = process.env.NEXT_PUBLIC_LINKTEST + "";
    // axios.post(api, {
    // }).then(function(response){
    //   console.log(response);
    //   if (response.data.status === "200 OK"){
    //     //waiting for ton.....
    //     toSignin()
    //     logout();
    //   }
    //   else{
    //     console.log("false", errMsg);
    //     setErrMsg("Incorrect username or password")
    //   }
    // }).catch(function(error){
    //   console.log("false", errMsg);
    //   setErrMsg("Incorrect username or password")
    // });
  };
  const toSignin = useCallback(() => {
    router.push({
      pathname: "/",
    });
  }, [router]);

  return (
    <nav className="bg-blue-900 shadow-md fixed w-full top-0 left-0 z-20 font-Poppins ">
      <div className="flex items-center justify-between bg-blue-900 py-4 md:px-10 px-5">
        <div className="flex justify-between items-center duration-500 z-20">
          <div>
            <img className="h-11 w-11" src="/w_symbol.png" alt=""></img>
          </div>
        </div>
        <div className="flex">
          <div className="bg-white px-4 py-3 rounded-md font-semibold border-blue-100 border-2 text-blue-900 mr-10">
            WebAdmin
          </div>
          <button
            className="bg-red-600 px-4 py-3 rounded-md font-semibold border-blue-100 border-2 text-white
        duration-100 hover:scale-105 hover:bg-red-800"
            onClick={() => toSignOut()}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_webadmin;
