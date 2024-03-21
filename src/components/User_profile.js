import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const User_profile = () => {
  const router = useRouter();
  const [pic, setpic] = useState("");
  const [showUser, setShowUser] = useState(false);
  const {logout,token} = useAuth();

  let time = 1

  const handleshowUser = (event) => {
    event.stopPropagation();
    setShowUser(!showUser);
  };

  const sendToken = () => {
    if (token !== null || token !== "null"){
    setpic("/Profile_user.png");
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/profile/imageProfile ";
    axios.post(api,{
      access_token: token,
    }).then(function(response){
      console.log(response,"image")
      setpic(extractImagePath(response.data.profile_path))
    })
  }
  }

  const extractImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_USER_IMAGE+fullPath
    console.log(newPath)
    return newPath;
  };

  const toSignOut = () => {
        
    //waiting for ton
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/auth/logout";
    console.log(api)
    axios.post(api, {
      access_token: token,
    }).then(function(response){
      console.log(response);
      if (response.data.status === "200 OK"){
        //waiting for ton.....
         
        logout();
        toSignin()
      }
      else{
        console.log("false"); 
      }
    }).catch(function(error){
      console.log("false");
    });
  }

  const toSignin = useCallback(
    () => {
      router.push({
        pathname : "/",
        });
    },
    [router]
  );

  const toUserProfile = useCallback((event) => {
    event.stopPropagation();
    router.push({
      pathname: "/User/Profile",
    });
  }, [router]);

  useEffect(() => {
    const handleClick = () => {
      setShowUser(false);
    };
    document.addEventListener("click", handleClick);
    if (time === 1 && token !== null && token!== "null"){
    sendToken();
    time--
    }
  },[]);

  return (
    <div className="ml-3">
      <div>
        {pic ? (
          <button
            id="User"
            type="button"
            className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            onClick={handleshowUser}
          >
            <img className="h-10 w-10 rounded-full" src={pic} alt="" />
          </button>
        ) : (
          <svg
            width="40"
            height="40"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.6154 38.1665C23.1593 38.1688 25.6706 37.5874 27.9617 36.466C30.2529 35.3445 32.2643 33.7122 33.846 31.6914L34.165 31.2838L33.7468 30.9791C30.3416 28.4979 25.7022 26.7498 20.6154 26.7498C15.5286 26.7498 10.8891 28.4979 7.48401 30.9791L7.06576 31.2838L7.38474 31.6914C8.96651 33.7122 10.9779 35.3445 13.2691 36.466C15.5601 37.5874 18.0714 38.1688 20.6154 38.1665ZM20.6154 38.1665C20.6155 38.1665 20.6157 38.1665 20.6159 38.1665L20.6154 37.6665L20.6149 38.1665C20.6151 38.1665 20.6152 38.1665 20.6154 38.1665ZM0.60257 20.9998C0.60257 9.76239 9.56958 0.666504 20.6154 0.666504C31.6612 0.666504 40.6282 9.76239 40.6282 20.9998C40.6282 32.2373 31.6612 41.3332 20.6154 41.3332C9.56958 41.3332 0.60257 32.2373 0.60257 20.9998ZM13.5194 12.8123C13.1341 13.757 12.9359 14.7694 12.9359 15.7915C12.9359 17.8555 13.7431 19.8365 15.1824 21.2983C16.622 22.7603 18.5761 23.5832 20.6154 23.5832C22.6546 23.5832 24.6088 22.7603 26.0483 21.2983C27.4876 19.8365 28.2949 17.8555 28.2949 15.7915C28.2949 14.7694 28.0967 13.757 27.7113 12.8123C27.326 11.8675 26.7611 11.0086 26.0483 10.2847C25.3356 9.56083 24.489 8.9862 23.5567 8.594C22.6245 8.2018 21.625 7.99984 20.6154 7.99984C19.6058 7.99984 18.6063 8.2018 17.674 8.594C16.7418 8.9862 15.8952 9.56083 15.1824 10.2847C14.4697 11.0086 13.9047 11.8675 13.5194 12.8123Z"
              fill="#FDFDFE"
              stroke="#1E3A8A"
            />
          </svg>
        )}
      </div>
      {showUser && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <button className="block px-4 py-2 text-sm text-gray-700"
          onClick={toUserProfile}>
              Your Profile
          </button>
          <button className="block px-4 py-2 text-sm text-gray-700"
          onClick={toSignOut}>
              Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default User_profile;
