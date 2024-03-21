// pages/home.js

import Create_team from "@/components/Create_team";
import Loading from "@/components/Loading";
import User_Navbar from "@/components/User_Navbar";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";




function User({ team }) {
  const { token } = useAuth();

  const [showTeam, setshowTeam] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [showOption, setShowOption] = useState([]);
  const [deleteTeam, setDeleteTeam] = useState(false);
  const [editTeam, setEditTeam] = useState(false);
  const [leaveTeam, setLeaveTeam] = useState(false);
  const [loading, setLoading] = useState(false);
  // const dotElementRef = useRef(null);

  const api = process.env.NEXT_PUBLIC_LINKTEST + "/auth/getCookie_team";

  const router = useRouter();

  const user = token
  // console.log("Token:",user)

  console.log(token)
  let time = 1;
  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);

  const defaultValues = {
    user: user,
    team: teamData,
    team_num: showOption,
  };

  const delTeam = async (team_id) => {
    console.log(team_id);
    console.log(defaultValues.user);
    axios
      .post(process.env.NEXT_PUBLIC_LINKTEST + "/team/delete", {
        access_token: defaultValues.user,
        team_id: team_id,
      })
      .then(function (response) {
        console.log(response);
        if (response.data === "200 OK") {
          //wait ton
          toReloadPage();
        } else {
          //dev page add
          console.log("somehow wrong");
        }
      });
  };




  const sendToken = async () => {
    // setLoading(true)
    //check token iden
    // setloadData(true);

    //   console.log('OK')
    //   //test local
    //   const team_data = [
    //     {
    //       team_id: "3",
    //       team_name: "Team1",
    //       picture_team: "yteh",
    //       role: "Owner",
    //       count_member: "3",
    //     },
    //     {
    //       team_id: "4",
    //       team_name: "tran",
    //       picture_team: "picture",
    //       role: "Owner",
    //       count_member: "3",
    //     },
    //     {
    //       team_id: "5",
    //       team_name: "Team2",
    //       picture_team: "yteh",
    //       role: "Admin",
    //       count_member: "54",
    //     },
    //   ];
    //   setTeamData(team_data);
    //   const newShowOption = Array(team_data.length).fill(false);
    //   setShowOption(newShowOption);
    //   setshowTeam(true);
    // for online
    if (defaultValues.user !== null && defaultValues.user !== "null") {
      axios
        .post(process.env.NEXT_PUBLIC_LINKTEST + "/auth/check_token_team", {
          access_token: defaultValues.user,
        })
        .then(function (response) {
          setLoading(false)
          console.log("ddf", response.data);
          if (response.request.status === 201) {
            //wait ton
            if (response.data.length !== 0) {
              const team_data = response.data;
              setTeamData(team_data);
              const newShowOption = Array(response.data.length).fill(false);
              setShowOption(newShowOption);
              setshowTeam(true);
            } else {
              setshowTeam(false);
            }
          } else {
            setErrMsg("ERROR");
          }
        });
    }

  };
  const handleToggleDropdown = (index) => {
    setShowOption((prevShowOption) => {
      const newShowOption = [...prevShowOption];
      newShowOption[index] = !newShowOption[index];
      return newShowOption;
    });
  };

  const handleDeleteTeam = () => {
    setDeleteTeam(!deleteTeam);
    //delTeam(team_id);
  };

  const handleConfirmDel = (team_id) => {
    delTeam(team_id);
  };

  const handleLeaveTeam = () => {
    setLeaveTeam(!leaveTeam);
  };

  const handleEditTeam = (team_id) => {
    //for test team_mangement
    toManagementTeam(team_id);
    setEditTeam(!editTeam);
  };

  //for test team_management
  const toManagementTeam = useCallback(
    (team_id) => {
      router.push({
        pathname: "User/Team_management",
        query: { team_id: team_id },
      });
    },
    [router]
  );

  const toTeampage = useCallback(
    (team_id) => {
      router.push({
        pathname: "User/Team",
        query: { team_id: team_id },
      })
    }, [router]
  )

  // ServerSide Tactic
  // const extractImagePath = (fullPath) => {
  //   // console.log("testserverside", team)
  //   const pathParts = fullPath.split('/');
  //   const imageFileName = pathParts[pathParts.length - 1];
  //   console.log(imageFileName)
  //   // getserverside
  //   const imageData = team.find((image) => image.name === imageFileName);
  //   console.log(imageData.data)
  //   return imageData.data;

  //   // return imageFileName
  // };

  const extractImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_TEAM_IMAGE+fullPath
    console.log(newPath)
    return newPath;
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#FFFCFC";
    // console.log(user)

    if (user === "null" || user === null) {
      console.log("ok")
      router.push({
        pathname: "/",

      });
    }
    //document.addEventListener('click',handleClickOutside)
    //only for test front
    if (time === 1 || user !== null || user !== "null") {
      sendToken();
      time--;
    }

  }, []);

  const image = "";
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
        <User_Navbar />
        <div className="font-Poppins mt-[6rem]">
          <div className="grid justify-items-center xl:justify-items-start xl:ml-10 ">
            <Create_team />
          </div>
          <div className="flex flex-col mt-7 border-t-2 border-blue-900 font-Poppins">
            <div className="mt-7 flex items-center justify-between ml-5 w-[13rem] h-14 bg-white rounded-md border-4 border-blue-800">
              <svg
                width="30"
                height="30"
                viewBox="0 0 37 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2"
              >
                <path
                  d="M23.783 29.552C25.2401 29.9751 26.75 30.189 28.2673 30.1875C30.7075 30.191 33.116 29.6346 35.3074 28.5612C35.3722 27.03 34.936 25.5194 34.065 24.2584C33.1941 22.9974 31.9358 22.0547 30.4808 21.5732C29.0259 21.0917 27.4536 21.0977 26.0024 21.5901C24.5511 22.0826 23.2999 23.0348 22.4385 24.3023M23.783 29.552V29.5469C23.783 27.6455 23.2944 25.8569 22.4385 24.3023M23.783 29.552V29.7331C20.4952 31.7132 16.7286 32.7565 12.8906 32.75C8.9085 32.75 5.18263 31.6481 2.00171 29.7331L2 29.5469C1.99869 27.1287 2.80226 24.7788 4.28401 22.8677C5.76577 20.9567 7.84143 19.5932 10.1838 18.9921C12.5261 18.3911 15.0018 18.5867 17.2207 19.5482C19.4395 20.5096 21.2753 22.1822 22.4385 24.3023M18.658 7.76562C18.658 9.29476 18.0505 10.7613 16.9692 11.8425C15.888 12.9238 14.4215 13.5312 12.8923 13.5312C11.3632 13.5312 9.89669 12.9238 8.81542 11.8425C7.73416 10.7613 7.12671 9.29476 7.12671 7.76562C7.12671 6.23649 7.73416 4.76998 8.81542 3.68871C9.89669 2.60745 11.3632 2 12.8923 2C14.4215 2 15.888 2.60745 16.9692 3.68871C18.0505 4.76998 18.658 6.23649 18.658 7.76562ZM32.7517 11.6094C32.7517 12.7987 32.2793 13.9393 31.4383 14.7803C30.5973 15.6213 29.4567 16.0937 28.2673 16.0937C27.078 16.0937 25.9374 15.6213 25.0964 14.7803C24.2554 13.9393 23.783 12.7987 23.783 11.6094C23.783 10.42 24.2554 9.27943 25.0964 8.43844C25.9374 7.59746 27.078 7.125 28.2673 7.125C29.4567 7.125 30.5973 7.59746 31.4383 8.43844C32.2793 9.27943 32.7517 10.42 32.7517 11.6094Z"
                  fill="#1E3A8A"
                />
                <path
                  d="M23.783 29.552C25.2401 29.9751 26.75 30.189 28.2673 30.1875C30.7075 30.191 33.116 29.6346 35.3074 28.5612C35.3722 27.03 34.936 25.5194 34.065 24.2584C33.1941 22.9974 31.9358 22.0547 30.4808 21.5732C29.0259 21.0917 27.4536 21.0977 26.0024 21.5901C24.5511 22.0826 23.2999 23.0348 22.4385 24.3023M23.783 29.552V29.5469C23.783 27.6455 23.2944 25.8569 22.4385 24.3023M23.783 29.552V29.7331C20.4952 31.7132 16.7286 32.7565 12.8906 32.75C8.9085 32.75 5.18263 31.6481 2.00171 29.7331L2 29.5469C1.99869 27.1287 2.80226 24.7788 4.28401 22.8677C5.76577 20.9567 7.84143 19.5932 10.1838 18.9921C12.5261 18.3911 15.0018 18.5867 17.2207 19.5482C19.4395 20.5096 21.2753 22.1822 22.4385 24.3023M18.658 7.76562C18.658 9.29476 18.0505 10.7613 16.9692 11.8425C15.888 12.9238 14.4215 13.5312 12.8923 13.5312C11.3632 13.5312 9.89669 12.9238 8.81542 11.8425C7.73416 10.7613 7.12671 9.29476 7.12671 7.76562C7.12671 6.23649 7.73416 4.76998 8.81542 3.68871C9.89669 2.60745 11.3632 2 12.8923 2C14.4215 2 15.888 2.60745 16.9692 3.68871C18.0505 4.76998 18.658 6.23649 18.658 7.76562ZM32.7517 11.6094C32.7517 12.7987 32.2793 13.9393 31.4383 14.7803C30.5973 15.6213 29.4567 16.0937 28.2673 16.0937C27.078 16.0937 25.9374 15.6213 25.0964 14.7803C24.2554 13.9393 23.783 12.7987 23.783 11.6094C23.783 10.42 24.2554 9.27943 25.0964 8.43844C25.9374 7.59746 27.078 7.125 28.2673 7.125C29.4567 7.125 30.5973 7.59746 31.4383 8.43844C32.2793 9.27943 32.7517 10.42 32.7517 11.6094Z"
                  stroke="#1E3A8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="font-bold text-blue-900 text-xl  mr-6 ">
                Your Team
              </div>

            </div>
            <div>
              {showTeam && (
                <ul className="relative space-y-5 mt-7 drop-shadow-md">
                  {defaultValues.team.map((team, index) => (
                    <li key={index} id="team"
                      onClick={() => toTeampage(team.team_id)}
                    >
                      <div className=" static flex items-center justify-between ml-5 w-auto mr-6 h-[4rem] md:h-[6rem] bg-white rounded-md border  ">
                        <div className="flex flex-row items-center">
                          <img
                            className="h-10 md:h-[4rem] md:w-20  ml-3 fill-red-300 "
                            src={extractImagePath(team.picture_team)}
                            alt="Image"

                          />
                          <div className="ml-3 md:ml-5 text-xl">
                            {team.team_name}
                          </div>
                        </div>
                        <div className="flex flex-row items-center">
                          <div className="flex items-center  md:mr-4 w-auto px-3 h-9 bg-white rounded-md border-4 border-blue-950 ">
                            {team.role}
                          </div>
                          <svg
                            width="24"
                            height="29"
                            viewBox="0 0 37 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className=" hidden md:block "
                          >
                            <path
                              d="M23.783 29.552C25.2401 29.9751 26.75 30.189 28.2673 30.1875C30.7075 30.191 33.116 29.6346 35.3074 28.5612C35.3722 27.03 34.936 25.5194 34.065 24.2584C33.1941 22.9974 31.9358 22.0547 30.4808 21.5732C29.0259 21.0917 27.4536 21.0977 26.0024 21.5901C24.5511 22.0826 23.2999 23.0348 22.4385 24.3023M23.783 29.552V29.5469C23.783 27.6455 23.2944 25.8569 22.4385 24.3023M23.783 29.552V29.7331C20.4952 31.7132 16.7286 32.7565 12.8906 32.75C8.9085 32.75 5.18263 31.6481 2.00171 29.7331L2 29.5469C1.99869 27.1287 2.80226 24.7788 4.28401 22.8677C5.76577 20.9567 7.84143 19.5932 10.1838 18.9921C12.5261 18.3911 15.0018 18.5867 17.2207 19.5482C19.4395 20.5096 21.2753 22.1822 22.4385 24.3023M18.658 7.76562C18.658 9.29476 18.0505 10.7613 16.9692 11.8425C15.888 12.9238 14.4215 13.5312 12.8923 13.5312C11.3632 13.5312 9.89669 12.9238 8.81542 11.8425C7.73416 10.7613 7.12671 9.29476 7.12671 7.76562C7.12671 6.23649 7.73416 4.76998 8.81542 3.68871C9.89669 2.60745 11.3632 2 12.8923 2C14.4215 2 15.888 2.60745 16.9692 3.68871C18.0505 4.76998 18.658 6.23649 18.658 7.76562ZM32.7517 11.6094C32.7517 12.7987 32.2793 13.9393 31.4383 14.7803C30.5973 15.6213 29.4567 16.0937 28.2673 16.0937C27.078 16.0937 25.9374 15.6213 25.0964 14.7803C24.2554 13.9393 23.783 12.7987 23.783 11.6094C23.783 10.42 24.2554 9.27943 25.0964 8.43844C25.9374 7.59746 27.078 7.125 28.2673 7.125C29.4567 7.125 30.5973 7.59746 31.4383 8.43844C32.2793 9.27943 32.7517 10.42 32.7517 11.6094Z"
                              fill="white"
                            />
                            <path
                              d="M23.783 29.552C25.2401 29.9751 26.75 30.189 28.2673 30.1875C30.7075 30.191 33.116 29.6346 35.3074 28.5612C35.3722 27.03 34.936 25.5194 34.065 24.2584C33.1941 22.9974 31.9358 22.0547 30.4808 21.5732C29.0259 21.0917 27.4536 21.0977 26.0024 21.5901C24.5511 22.0826 23.2999 23.0348 22.4385 24.3023M23.783 29.552V29.5469C23.783 27.6455 23.2944 25.8569 22.4385 24.3023M23.783 29.552V29.7331C20.4952 31.7132 16.7286 32.7565 12.8906 32.75C8.9085 32.75 5.18263 31.6481 2.00171 29.7331L2 29.5469C1.99869 27.1287 2.80226 24.7788 4.28401 22.8677C5.76577 20.9567 7.84143 19.5932 10.1838 18.9921C12.5261 18.3911 15.0018 18.5867 17.2207 19.5482C19.4395 20.5096 21.2753 22.1822 22.4385 24.3023M18.658 7.76562C18.658 9.29476 18.0505 10.7613 16.9692 11.8425C15.888 12.9238 14.4215 13.5312 12.8923 13.5312C11.3632 13.5312 9.89669 12.9238 8.81542 11.8425C7.73416 10.7613 7.12671 9.29476 7.12671 7.76562C7.12671 6.23649 7.73416 4.76998 8.81542 3.68871C9.89669 2.60745 11.3632 2 12.8923 2C14.4215 2 15.888 2.60745 16.9692 3.68871C18.0505 4.76998 18.658 6.23649 18.658 7.76562ZM32.7517 11.6094C32.7517 12.7987 32.2793 13.9393 31.4383 14.7803C30.5973 15.6213 29.4567 16.0937 28.2673 16.0937C27.078 16.0937 25.9374 15.6213 25.0964 14.7803C24.2554 13.9393 23.783 12.7987 23.783 11.6094C23.783 10.42 24.2554 9.27943 25.0964 8.43844C25.9374 7.59746 27.078 7.125 28.2673 7.125C29.4567 7.125 30.5973 7.59746 31.4383 8.43844C32.2793 9.27943 32.7517 10.42 32.7517 11.6094Z"
                              stroke="#1E3A8A"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="font-blue-900 mr-5 text-2xl ml-2 hidden md:block">
                            {team.count_member}
                          </div>

                        </div>
                      </div>

                    </li>
                  ))}
                </ul>
              )}

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
                    It looks like you dont have a team yet.
                  </div>
                </div>
              )}
              {loading && (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;



// export async function getServerSideProps() {

//   const teamImageDirectory = './src/pages/files/team_image';

//   const teamImageFiles = fs.readdirSync(teamImageDirectory);

//   const dataImages = teamImageFiles.map((filename) => {
//     const name = filename;
//     const imagePath = path.join(teamImageDirectory, filename);
//     const extensionName = path.extname(imagePath);
//     const data = fs.readFileSync(imagePath);
//     const base64Image = Buffer.from(data, 'binary').toString('base64');
//     // combine all strings
//     const base64ImageStr = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
//     // Convert data to base64 to pass it as props
//     return { name, data: base64ImageStr };
//   });
//   return {
//     props: { team: dataImages }
//   };
// }

