// pages/home.js

import Create_team from "@/components/Create_team";
import Loading from "@/components/Loading";
import Notify_compo from "@/components/Notify";
import U_user from "@/components/U_user";
import User_Navbar from "@/components/User_Navbar";
import User_profile from "@/components/User_profile";
import MyWorkSpace_toh from "@/components/my_workspace_toh";
import Sidebar from "@/components/sidebar";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const Workspace = () => {
  //for test frontend waiting ton parameter
  const [teamData, setTeamData] = useState([]);
  const [yourVideo, setYourVideo] = useState([]);
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showTeam, setshowTeam] = useState(false);
  const [loading, setLoading] = useState(false);


  const { token } = useAuth();

  const user = token;

  const defaultValues = {
    user: user,
    team: teamData,
    video: yourVideo,
  };

  console.log("token_workspace", defaultValues.user);

  const extractImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_MERGE_VIDEO + fullPath
    console.log(newPath)
    return newPath;
  };

  const extractsubtitlePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_SUBTITLE + fullPath
    console.log(newPath)
    return newPath;
  };

  const getNameVideo = (fullPath) => {
    const sreWord = fullPath.split('_')
    console.log(sreWord)
    const name = sreWord.shift();

    return `${name}`;
  };

  const download_video_emb = async (video_id) => {
    console.log(video_id);
    try {
      //waiting API
      const api =
        process.env.NEXT_PUBLIC_LINKTEST + "/video/new_download_video";
      console.log(api);
      //waiting ton to decide  response
      const response = await axios.post(api, {
        access_token: defaultValues.user,
        video_id: video_id,
      });
      console.log(response);
      if (response.status === 201) {
        console.log(response);
        const filePath = extractImagePath(response.data.merge_path);
        const nameVideo = getNameVideo(response.data.merge_path);
        console.log(filePath, nameVideo);
        fetch(filePath)
          .then(response => response.blob())
          .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = nameVideo;
            link.style.fontFamily = "Poppins";
            link.click();
            setTimeout(() => {
              toReloadPage();
          }, 3000);
  
          })
          .catch(console.error);
      } else {
        setErrMsg("ERROR");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const download_subtitle = async (video_id) => {
    try {
      console.log(video_id);
      //waiting API
      const api =
        process.env.NEXT_PUBLIC_LINKTEST + "/video/new_download_subtitle";
      console.log(api);
      //waiting ton to decide  response
      const response = await axios.post(api, {
        access_token: defaultValues.user,
        video_id: video_id,
      });
      console.log(response);
      if (response.status === 201) {
        //waiting for ton parameter
        console.log(response);
        const filePath = extractsubtitlePath(response.data.sub_path);
        const nameVideo = getNameVideo(response.data.sub_path);
        console.log(filePath, nameVideo);

        const link = document.createElement("a");
        link.href = filePath;

        // Optional: Set the download attribute to prompt download
        link.download = nameVideo; // Adjust the downloaded file name and extension

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger a click event to initiate download
        link.click();
        
        // Clean up: remove the link from the DOM
        document.body.removeChild(link);
      } else {
        setErrMsg("ERROR");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };


  const sendToken = async () => {
    setLoading(true);
    // test local
    // const team = [
    //   {
    //     team_id: "3",
    //     team_name: "Team1",
    //     picture_team: "picture",
    //   },
    //   {
    //     team_id: "4",
    //     team_name: "tran",
    //     picture_team: "picture",
    //   },
    //   {
    //     team_id: "5",
    //     team_name: "Team2",
    //     picture_team: "picture",
    //   },
    // ];

    // setTeamData(team);

    // const video = [
    //   {
    //     Video_id: "2",
    //     Video_name: "video",
    //     Video_image: "base64",
    //     Date: "30 Dec 2022",
    //   },
    //   {
    //     Video_id: "2",
    //     Video_name: "video",
    //     Video_image: "base64",
    //     Date: "30 Dec 2022",
    //   },
    // ];

    // setYourVideo(video);

    // setloadData(true);
    //waiting ton
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/userWorkSpace/work_space";
    axios
      .post(api, {
        access_token: defaultValues.user,
      })
      .then(function (response) {
        setLoading(false);
        console.log(response);
        if (response.data.status === "200 OK") {
          //waiting ton
          const teamItems = response.data.team;
          setTeamData(teamItems);
          if (response.data.video.length !== 0) {
            const Your_Video = response.data.video;
            setYourVideo(Your_Video);
            setshowTeam(true);
          } else {
            setshowTeam(false);
          }
        } else {
          setErrMsg("ERROR");
        }
      });
  };

  const DelVideo = async (video_id) => {
    setLoading(true);

    axios
      //wait ton
      .post(process.env.NEXT_PUBLIC_LINKTEST + "/video/deleteVideo", {
        access_token: token,
        video_id: video_id
      })
      .then(function (response) {
        console.log(response);
        if (response.data === "200 OK") {
          //wait ton
          setLoading(false);
          toReloadPage();
        } else {
          //dev page add
          console.log("something wrong TT");
        }
      });
  };

  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);

  const handleConfirmDelPost = (video_id) => {
    console.log(video_id)
    DelVideo(video_id);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#FFFCFC";
    if (token === "null") {
      router.push({
        pathname: "/sign_in",
      });
    }
    //only for test front
    if (defaultValues.video.length !== 0) {
      setshowTeam(true);
    } else {
      setshowTeam(false);
    }
    const fecthData = async () => {
      try {
        await sendToken();
      } catch (error) {
        console.error("Error sending token:", error);
      }
    };
    // waiting for ton
    fecthData();
  }, []);

  const extractThumnailPath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_THUMBNAIL + fullPath
    console.log(newPath)
    return newPath;
  };

  const toHome = useCallback(() => {
    router.push({
      pathname: "/User",
    });
  }, [router]);

  const IconhandleClick = () => {
    toHome();
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleDownloadVideo_emb = async (video_name) => {
    console.log("click_video_download");
    download_video_emb(video_name);
  };
  const handleDownloadSubtitle = async (video_name) => {
    console.log("click_subtitle");
    download_subtitle(video_name);
  };
  return (
    <div>
      <Head>
        <style>
          {`
           @import url("https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=Oswald:wght@500&family=Poppins&family=Raleway:wght@100;600;700&display=swap");
          `}
        </style>
      </Head>

      <nav className="bg-blue-900 shadow-md w-full fixed top-0 left-0 z-50 font-Poppins">
        <div className="flex justify-between bg-blue-900 py-4 md:px-10 px-5 ">
          <div className="flex items-center ">
            <button className="h-11 w-11" onClick={IconhandleClick}>
              <svg
                width="38"
                height="38"
                viewBox="0 0 79 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="6" y="8" width="68" height="60" fill="#1e3a8a" />
                <path
                  d="M12.7021 0.0631145C5.74363 0.745628 0.529714 6.20574 0.0688887 13.2909C-0.0561925 15.2344 0.00305651 64.9539 0.134721 65.7989C1.1222 72.286 5.90162 77.0279 12.3137 77.8859C13.6896 78.0712 66.2303 78.0159 67.198 77.8274C71.9149 76.9174 75.8023 74.0443 77.5863 70.1475C78.2447 68.7077 78.587 67.6254 78.8273 66.2214C78.982 65.3049 79.0741 14.1034 78.9227 12.5661C78.6266 9.47594 77.2888 6.57325 75.1237 4.32286C72.9585 2.07246 70.0911 0.604528 66.9808 0.154116C66.0492 0.0241137 14.0286 -0.0668881 12.7021 0.0631145ZM36.5235 20.051C38.8507 22.3488 40.7532 24.2728 40.7532 24.3248C40.7532 24.4028 38.877 24.4223 31.5696 24.4223C21.3459 24.4223 21.8594 24.3963 20.7534 24.9424C16.9845 26.8274 16.8857 32.0925 20.5822 34.0425C21.7014 34.6275 21.4545 34.608 26.2602 34.6665C30.8817 34.725 31.1154 34.7413 32.7645 35.1638C37.6854 36.4248 41.6123 40.4939 42.6887 45.447C43.0953 47.2901 43.1107 49.1964 42.7339 51.0456C42.357 52.8949 41.596 54.6469 40.499 56.1912C39.402 57.7355 37.9927 59.0386 36.36 60.0181C34.7274 60.9977 32.9069 61.6325 31.0133 61.8826C29.8711 62.0321 9.27223 62.0451 9.27223 61.8956C9.27223 61.8436 11.1583 59.939 13.4625 57.664L17.6461 53.5267L23.8014 53.4942C30.615 53.4649 30.2859 53.4877 31.4577 52.9352C32.206 52.5824 32.8571 52.0565 33.3557 51.4023C33.8542 50.748 34.1856 49.9847 34.3216 49.177C34.4576 48.3693 34.3943 47.5412 34.1369 46.7628C33.8796 45.9845 33.4359 45.2789 32.8435 44.706C31.4248 43.3085 30.964 43.2077 26.0957 43.2045C20.1642 43.2045 18.3143 42.7982 15.388 40.8612C5.25647 34.1465 8.3045 18.6405 20.2432 16.1704C21.494 15.9104 21.9614 15.8909 27.1885 15.8812L32.2938 15.8714L36.5202 20.0478M69.6568 15.9657C69.6568 16.0209 67.7543 17.9417 65.4304 20.2395L61.204 24.4191H46.632L42.3661 20.2005C40.9248 18.7949 39.5027 17.3701 38.1002 15.9267C38.1002 15.8942 45.2002 15.8682 53.8769 15.8682C66.4278 15.8682 69.6568 15.8877 69.6568 15.9657ZM61.2237 38.9111L61.204 43.1622H46.5596L46.451 42.8567C45.345 39.7951 44.1633 37.8939 42.0205 35.7261C41.6833 35.4028 41.3625 35.0633 41.0593 34.7088C41.0593 34.6763 45.6017 34.6568 51.1514 34.6568H61.2435L61.2237 38.9111ZM65.4304 57.6965C66.8585 59.0881 68.2674 60.4988 69.6568 61.9281C69.6568 61.9606 63.2217 61.9866 55.3581 61.9866C47.4944 61.9866 41.0593 61.9606 41.0593 61.9281C41.0593 61.8956 41.3984 61.5381 41.8098 61.1383C43.8784 59.1648 45.4363 56.7292 46.3522 54.0369L46.5267 53.5169H61.2007L65.4304 57.6965Z"
                  fill="white"
                />
              </svg>
            </button>

            <MyWorkSpace_toh />
          </div>
          <div className="flex justify-items-center">
            <Notify_compo />
            <User_profile />
          </div>
        </div>
      </nav>

      <div className="font-Poppins flex">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          user={defaultValues.user}
          Team={defaultValues.team}
        />

        <div className={`flex-1 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
          <div className="border-b-4 border-blue-900 ">
            <div className="mt-[7rem]">
              <div className="mt-8 ml-2 md:ml-8 text-xl md:text-2xl font-semibold">
                Create your subtitle
              </div>
              <div className="py-5">
                <U_user user={defaultValues.user} />
              </div>
            </div>
          </div>
          <div className="border-b-4 border-blue-900 ">
            <div className="py-10">
              <div className="ml-2 md:ml-8 text-xl md:text-2xl font-semibold mb-10">
                Your Video
              </div>
              {showTeam && (
                <ul className="relative space-y-2 font-medium px-3 mt-4 drop-shadow-md">
                  {defaultValues.video.map((video, index) => (
                    <li key={index}>
                      <div className="bg-white flex flex-row p-4 rounded-xl border-gradient-to-b border-2 from-blue-900 to-blue-500 ">
                        <img
                        className="w-40 h-auto"
                        src={extractThumnailPath(video.thumbnail)}
                      ></img>
                        <div className="ml-4 flex-1 flex-col">
                          <div className="flex justify-between border-b-2 border-blue-900">
                            <div className="flex-1  py-2 ">
                              {getNameVideo(video.video_name)}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleConfirmDelPost(
                                  video.video_id
                                );
                              }}
                            >
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_717_78)">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M25 29.4207L36.0479 40.4686C36.6342 41.0548 37.4293 41.3842 38.2583 41.3842C39.0874 41.3842 39.8825 41.0548 40.4688 40.4686C41.055 39.8824 41.3843 39.0873 41.3843 38.2582C41.3843 37.4291 41.055 36.634 40.4688 36.0478L29.4167 24.9999L40.4667 13.9519C40.7568 13.6617 40.9869 13.3171 41.1439 12.9379C41.3009 12.5587 41.3816 12.1523 41.3815 11.7418C41.3814 11.3314 41.3005 10.925 41.1433 10.5459C40.9862 10.1668 40.7559 9.82229 40.4656 9.53215C40.1754 9.24202 39.8308 9.01189 39.4516 8.85492C39.0724 8.69795 38.6659 8.61721 38.2555 8.61731C37.8451 8.6174 37.4387 8.69834 37.0596 8.85549C36.6805 9.01263 36.336 9.24292 36.0458 9.5332L25 20.5811L13.9521 9.5332C13.664 9.23459 13.3192 8.99637 12.9381 8.83241C12.5569 8.66845 12.1469 8.58206 11.7319 8.57826C11.317 8.57446 10.9055 8.65333 10.5213 8.81028C10.1372 8.96722 9.78819 9.1991 9.49464 9.49237C9.20109 9.78565 8.96888 10.1345 8.81158 10.5184C8.65427 10.9024 8.575 11.3139 8.57841 11.7288C8.58182 12.1437 8.66783 12.5538 8.83143 12.9352C8.99503 13.3165 9.23293 13.6615 9.53126 13.9499L20.5833 24.9999L9.53334 36.0499C9.23501 36.3383 8.99711 36.6832 8.83351 37.0646C8.66992 37.4459 8.58391 37.856 8.5805 38.2709C8.57709 38.6859 8.65635 39.0973 8.81366 39.4813C8.97097 39.8653 9.20317 40.2141 9.49672 40.5073C9.79028 40.8006 10.1393 41.0325 10.5234 41.1894C10.9075 41.3464 11.3191 41.4253 11.734 41.4215C12.1489 41.4177 12.559 41.3313 12.9401 41.1673C13.3213 41.0034 13.666 40.7651 13.9542 40.4665L25 29.4228V29.4207Z"
                                    fill="#FF0000	"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_717_78">
                                    <rect width="50" height="50" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>

                          </div>

                          <div className="py-2 flex justify-between">
                            <div>
                              {
                                new Date(video.video_date)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </div>
                            <div className="flex">
                              <button
                                id="downloadvideoemb"
                                onClick={() =>
                                  handleDownloadVideo_emb(video.video_id)
                                }
                              >
                                <svg
                                  width="28"
                                  height="30"
                                  viewBox="0 0 37 37"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M18.5 0C8.28276 0 0 8.28276 0 18.5C0 28.7172 8.28276 37 18.5 37C28.7172 37 37 28.7172 37 18.5C37 8.28276 28.7172 0 18.5 0ZM18.5 32.9783C10.5028 32.9783 4.02175 26.4952 4.02175 18.5C4.02175 10.5048 10.5028 4.02175 18.5 4.02175C26.4972 4.02175 32.9783 10.5048 32.9783 18.5C32.9783 26.4952 26.4972 32.9783 18.5 32.9783ZM22.1196 10.7582H14.8804V18.9826H10.356L18.5 26.644L26.644 18.9826H22.1196L22.1196 10.7582Z"
                                    fill="#1E3A8A"
                                  />
                                </svg>
                              </button>
                              <button
                                id="downloadsubtilte"
                                onClick={() =>
                                  handleDownloadSubtitle(video.video_id)
                                }
                              >
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 44 37"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="ml-3"
                                >
                                  <path
                                    d="M39.6 0C40.767 0 41.8861 0.487275 42.7113 1.35463C43.5364 2.22199 44 3.39837 44 4.625V32.375C44 33.6016 43.5364 34.778 42.7113 35.6454C41.8861 36.5127 40.767 37 39.6 37H4.4C3.23305 37 2.11389 36.5127 1.28873 35.6454C0.46357 34.778 0 33.6016 0 32.375V4.625C0 3.39837 0.46357 2.22199 1.28873 1.35463C2.11389 0.487275 3.23305 0 4.4 0H39.6ZM39.6 32.375V4.625H4.4V32.375H39.6ZM8.8 13.875H13.2V18.5H8.8V13.875ZM8.8 23.125H26.4V27.75H8.8V23.125ZM30.8 23.125H35.2V27.75H30.8V23.125ZM17.6 13.875H35.2V18.5H17.6V13.875Z"
                                    fill="#1E3A8A"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}{" "}
              {!showTeam && (
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
                    It looks like you have not a Video.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className={`invisible md:visible fixed bottom-4 ${isSidebarOpen ? "left-48" : "left-4"
          } p-2 bg-white border-2 border-blue-900 text-blue-900 rounded-lg `}
        onClick={handleToggleSidebar}
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        )}
      </button>
      {loading && <Loading />}
    </div>
  );
};

export default Workspace;
