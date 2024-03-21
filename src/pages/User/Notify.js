import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import User_Navbar from "@/components/User_Navbar";
import error from "../error";

const Notify = () => {
  const [showNoti, setShowNoti] = useState(false);
  const [noti, setNoti] = useState([]);
  const router = useRouter();
  const { token } = useAuth();
  let time = 1;

  const sendToken = async () => {
    // const data = [
    //   {
    //     team_image: "pic",
    //     noti_id: "1",
    //     noti: "คุณจริงใจเชิญเข้าร่วมทีม show meat ",
    //   },
    //   {
    //     team_image: "pic",
    //     noti_id: "2",
    //     noti: "คุณจริงใจเชิญเข้าร่วมทีม show meat ",
    //   },
    //   {
    //     team_image: "pic",
    //     noti_id: "3",
    //     noti: "คุณจริงใจเชิญเข้าร่วมทีม ddddddddda",
    //   },
    //   {
    //     team_image: "pic",
    //     noti_id: "4",
    //     noti: "คุณจริงใจเชิญเข้าร่วมทีม show meat ",
    //   },
    // ];
    // setNoti(data);
          // for online
      axios
        .post(process.env.NEXT_PUBLIC_LINKTEST + "/notification/showAllNotificationUser", {
          access_token: token,
        })
        .then(function (response) {
          console.log("res",response);
          if (response.data.status === "200 OK") {
            //wait ton
            if (response.data.notification.length !== 0) {
              setNoti(response.data.notification)
              setShowNoti(true);
            } else {
              setShowNoti(false);
            }
          } else {
            console.log("error")
          }
        });
  };

  const extractImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_TEAM_IMAGE+fullPath
    console.log(newPath)
    return newPath;
  };

  const handleConfirmInvitemember = (noti_id) =>{
    console.log(noti_id)
    axios
        .post(process.env.NEXT_PUBLIC_LINKTEST + "/notification/accept", {
          access_token: token,
          notification_id: noti_id
        })
        .then(function (response) {
          console.log("res",response);
          if (response.data.status === "200 OK") {
            //wait ton
           toReloadPage()
          } else {
            setErrMsg("ERROR");
          }
        });
  }

  const handleCancleInviteMember = (noti_id) =>{
    console.log(noti_id)
    axios
        .post(process.env.NEXT_PUBLIC_LINKTEST + "/notification/decline", {
          access_token: token,
          notification_id: noti_id
        })
        .then(function (response) {
          console.log("res",response);
          if (response.data.status === "200 OK") {
            //wait ton
           toReloadPage()
          } else {
            console.log("error")
          }
        });
  }

  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);

  useEffect(() => {
    if (token === "null") {
      router.push({
        pathname: "/sign_in",
      });
    }
    document.body.style.backgroundColor = "#FFFCFC";
    //document.addEventListener('click',handleClickOutside)
    //only for test front
    if (time === 1) {
      sendToken();
      time--;
    }
  }, []);

  return (
    <div>
      <Head>
        <style>
          {`
         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=Oswald:wght@500&family=Poppins&family=Raleway:wght@100;600;700&display=swap');
        `}
        </style>
      </Head>
      <User_Navbar />
      <div className="font-Poppins mt-[5rem] ml-2">
        <div className="flex  items-center px-3 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke=""
            className="w-10 h-10 stroke-red-700 fill-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          <div className="ml-2 text-red-700 text-xl font-bold ">
            Notification
          </div>
        </div>
      </div>
      <div>
        <div>
          {showNoti && (
            <ul className="relative space-y-5 mt-2 drop-shadow-md">
              {noti.map((noti, index) => (
                <li key={index} >
                  <div className="flex items-center justify-between ml-5 w-auto mr-6 h-auto- md:h-[6rem] bg-white rounded-md border py-3 md:py-0 ">
                    <div className="flex flex-row items-center">
                      {/* <img
                            className="h-10 md:h-[4rem] md:w-20  ml-3 fill-red-300 "
                            src={noti.team_image}
                            alt="SVG Image"
                          /> */}
                      <img
                        className="invisible md:visible h-0 w-0 md:h-[4rem] md:w-20  ml-3 rounded-[0.3rem]"
                        src={extractImagePath(noti.team_image)}
                        alt=" SVGImage"
                      />
                      <p className="ml-3 md:ml-5 text-xl ">{noti.sender_name} เชิญคุณเข้าร่วมทีม {noti.team_name}</p>
                    </div>
                    <div className="flex flex-row items-center">
                      <button id="Accept" className="border-2 border-green-900 rounded-full p-2 duration-100 hover:scale-105 hover:bg-green-300 mr-2 md:mr-5"
                      onClick={()=>handleConfirmInvitemember(noti.notification_id)}>
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 50 50"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 md:w-9 md:h-9 "
                        >
                          <g clipPath="url(#clip0_819_82)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M44.8877 10.6474C45.4736 11.2335 45.8027 12.0282 45.8027 12.8568C45.8027 13.6855 45.4736 14.4802 44.8877 15.0662L21.4648 38.4891C21.1553 38.7987 20.7878 39.0443 20.3833 39.2119C19.9788 39.3794 19.5453 39.4657 19.1075 39.4657C18.6697 39.4657 18.2362 39.3794 17.8317 39.2119C17.4273 39.0443 17.0598 38.7987 16.7502 38.4891L5.11272 26.8537C4.81425 26.5654 4.57618 26.2206 4.4124 25.8393C4.24862 25.4581 4.16242 25.048 4.15881 24.6331C4.1552 24.2181 4.23427 23.8066 4.3914 23.4226C4.54853 23.0385 4.78057 22.6896 5.07398 22.3962C5.3674 22.1028 5.71631 21.8708 6.10036 21.7136C6.48441 21.5565 6.89591 21.4774 7.31085 21.481C7.72578 21.4846 8.13584 21.5709 8.51711 21.7346C8.89837 21.8984 9.2432 22.1365 9.53147 22.4349L19.1065 32.0099L40.4669 10.6474C40.7571 10.357 41.1017 10.1267 41.481 9.96951C41.8602 9.81234 42.2668 9.73145 42.6773 9.73145C43.0879 9.73145 43.4944 9.81234 43.8737 9.96951C44.2529 10.1267 44.5975 10.357 44.8877 10.6474Z"
                              fill="green"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_819_82">
                              <rect width="50" height="50" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      <button id="Decline" className="border-2 border-red-600 rounded-full p-2 duration-100 hover:scale-105 hover:bg-red-300 mr-2 md:mr-5"
                      onClick={()=>handleCancleInviteMember(noti.notification_id)}>                  
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 50 50"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 md:w-9 md:h-9"
                        >
                          <path
                            d="M9.53117 9.53117C10.1172 8.94532 10.9119 8.61621 11.7405 8.61621C12.5692 8.61621 13.3639 8.94532 13.9499 9.53117L24.9999 20.5812L36.0499 9.53117C36.6393 8.96192 37.4287 8.64694 38.248 8.65406C39.0674 8.66118 39.8512 8.98984 40.4306 9.56924C41.01 10.1486 41.3387 10.9324 41.3458 11.7518C41.3529 12.5712 41.0379 13.3605 40.4687 13.9499L29.4187 24.9999L40.4687 36.0499C41.0379 36.6393 41.3529 37.4287 41.3458 38.248C41.3387 39.0674 41.01 39.8512 40.4306 40.4306C39.8512 41.01 39.0674 41.3387 38.248 41.3458C37.4287 41.3529 36.6393 41.0379 36.0499 40.4687L24.9999 29.4187L13.9499 40.4687C13.3605 41.0379 12.5712 41.3529 11.7518 41.3458C10.9324 41.3387 10.1486 41.01 9.56924 40.4306C8.98984 39.8512 8.66118 39.0674 8.65406 38.248C8.64694 37.4287 8.96192 36.6393 9.53117 36.0499L20.5812 24.9999L9.53117 13.9499C8.94532 13.3639 8.61621 12.5692 8.61621 11.7405C8.61621 10.9119 8.94532 10.1172 9.53117 9.53117Z"
                            fill="red"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!showNoti && (
            <div className="grid justify-items-center ml-5 w-auto h-auto ">
              <svg
                width="150"
                height="150"
                viewBox="0 0 291 291"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-12"
              >
                <path
                  d="M102.125 98.525C104.54 98.4566 106.945 98.8733 109.197 99.7505C111.448 100.628 113.501 101.947 115.234 103.632C116.966 105.316 118.344 107.331 119.284 109.557C120.224 111.782 120.709 114.174 120.709 116.591C120.709 119.007 120.224 121.399 119.284 123.625C118.344 125.851 116.966 127.865 115.234 129.55C113.501 131.234 111.448 132.554 109.197 133.431C106.945 134.308 104.54 134.725 102.125 134.656C97.3318 134.656 92.7349 132.752 89.3455 129.363C85.9562 125.974 84.0521 121.377 84.0521 116.583C84.0521 111.79 85.9562 107.193 89.3455 103.804C92.7349 100.415 97.3318 98.5105 102.125 98.5105V98.525ZM188.875 98.525C191.29 98.4566 193.695 98.8733 195.947 99.7505C198.198 100.628 200.251 101.947 201.984 103.632C203.716 105.316 205.094 107.331 206.034 109.557C206.975 111.782 207.459 114.174 207.459 116.591C207.459 119.007 206.975 121.399 206.034 123.625C205.094 125.851 203.716 127.865 201.984 129.55C200.251 131.234 198.198 132.554 195.947 133.431C193.695 134.308 191.29 134.725 188.875 134.656C184.172 134.523 179.707 132.562 176.427 129.188C173.148 125.815 171.313 121.295 171.313 116.591C171.313 111.886 173.148 107.367 176.427 103.993C179.707 100.62 184.172 98.658 188.875 98.525ZM91.2813 188.875C88.4053 188.875 85.6472 190.018 83.6136 192.051C81.58 194.085 80.4375 196.843 80.4375 199.719C80.4375 202.595 81.58 205.353 83.6136 207.387C85.6472 209.42 88.4053 210.563 91.2813 210.563H199.719C202.595 210.563 205.353 209.42 207.386 207.387C209.42 205.353 210.563 202.595 210.563 199.719C210.563 196.843 209.42 194.085 207.386 192.051C205.353 190.018 202.595 188.875 199.719 188.875H91.2813ZM0.916687 145.5C0.916687 65.6467 65.6466 0.916748 145.5 0.916748C225.353 0.916748 290.083 65.6467 290.083 145.5C290.083 225.353 225.353 290.083 145.5 290.083C65.6466 290.083 0.916687 225.353 0.916687 145.5ZM145.5 22.6042C112.906 22.6042 81.647 35.5522 58.5995 58.5996C35.5521 81.647 22.6042 112.906 22.6042 145.5C22.6042 178.094 35.5521 209.353 58.5995 232.401C81.647 255.448 112.906 268.396 145.5 268.396C178.094 268.396 209.353 255.448 232.4 232.401C255.448 209.353 268.396 178.094 268.396 145.5C268.396 112.906 255.448 81.647 232.4 58.5996C209.353 35.5522 178.094 22.6042 145.5 22.6042Z"
                  fill="#CBD5E1"
                />
              </svg>
              <div className="mt-4 text-slate-300">
                It looks like you dont have any Notification.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Notify;
