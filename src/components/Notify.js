import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const Notify_compo = () => {
  const router = useRouter();
  const { token } = useAuth();
  const [havenoti, setHaveNoti] = useState(false);
  const sendToken = async () => {
    axios
      .post(process.env.NEXT_PUBLIC_LINKTEST + "/notification/showAllNotificationUser", {
        access_token: token,
      })
      .then(function (response) {
        console.log("res", response);
        if (response.data.status === "200 OK") {
          if (response.data.notification.length !== 0) {
            setHaveNoti(true)
          } else {
            setHaveNoti(false)
          }
        } else {
          console.log("error")
        }
      });
  };

  useEffect(() => {
    
      sendToken();
    
  }, []);

  const toNotify = useCallback(() => {
    router.push("/User/Notify");
  }, [router]);
  return (
    <div>
      {havenoti && (<button id="Notification" onClick={toNotify} className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke=""
          className="w-10 h-10 stroke-red-700 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </button>)}
      {!havenoti && (<button id="Notification" onClick={toNotify} className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke=""
          className="w-10 h-10 stroke-red-700 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </button>)}

    </div>
  );
};

export default Notify_compo;
