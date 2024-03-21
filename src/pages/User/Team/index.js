import Create_post from "@/components/Create_post";
import Create_team from "@/components/Create_team";
import Loading from "@/components/Loading";
import User_Navbar from "@/components/User_Navbar";
import Sidebar from "@/components/sidebar";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const Team = () => {
  //for test frontend waiting ton parameter
  const [teamData, setTeamData] = useState([]);
  const [sidebarTeam, setsidebarTeam] = useState([]);
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { token } = useAuth();
  const [treedoton, setTreeDoton] = useState(false);
  const [deleteTeam, setDeleteTeam] = useState(false);
  const [showinvite, setShowinvite] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [email, setEmail] = useState("");
  const [selectedMemberinviteRole, setSelectedMemberinviteRole] =
    useState("User");
  const [post, setPost] = useState([]);
  const [showPost, setShowPost] = useState(false);
  const [showDeletePost, setShowDeletePost] = useState([]);
  const [showDelPostPage, setshowDelPostPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teampic, setTeamPic] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { team_id } = router.query;

  const user = token;

  const defaultValues = {
    user: user,
    team: teamData,
    sidebar_team: sidebarTeam,
    post: post,
  };


  const sendToken = async () => {
    setLoading(true)
    

    //test online
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/team/teamWebPage";
    //waiting ton
    if (team_id !== undefined) {
      axios
        .post(api, {
          access_token: defaultValues.user,
          team_id: team_id,
        })
        .then(function (response) {
          setLoading(false)
          console.log(response)
          if (response.status === 201) {
            //waiting ton
            const data = response.data;
            setsidebarTeam(data.teams);
            setTeamPic(extractImagePath(data.team_picture))
            setTeamData(data);

            if (data.posts.length !== 0) {
              setPost(data.posts);
              setShowPost(true);
            } else {
              setPost([]);
              setShowPost(false);
              console.log("dont have post");
            }
          } else {
            setErrMsg("ERROR");
          }
        });
    }
  };

  const extractImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_TEAM_IMAGE + fullPath
    console.log(newPath)
    return newPath;
  };

  const extractUserImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_USER_IMAGE + fullPath
    console.log(newPath)
    return newPath;
  };
  const extractThumnailPath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_THUMBNAIL + fullPath
    console.log(newPath)
    return newPath;
  };

  const Invite_member = (email, selectedRole) => {
    console.log(email.selectedRole)
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/notification/inviteUser";
    axios
      .post(api, {
        access_token: defaultValues.user,
        team_id: team_id,
        email: email,
        role: selectedRole,
      })
      .then(function (response) {
        console.log(response);
        if (response.data === "200 OK") {
          console.log("invite success")
          setShowinvite(!showinvite);
          toReloadPage();
        } else if (response.data.status === "404: Not Found Data") {
          //
          setErrMsg('Not found Data');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // local test
    //toReloadPage();
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
          toHomepage();
        } else {
          //dev page add
          console.log("somehow wrong");
        }
      });
  };

  const delPost = async (post_id) => {
    console.log(
      defaultValues.team.team_id,
      post_id,
      defaultValues.team.user_id,
      defaultValues.user
    );
    axios
      //wait ton
      .post(process.env.NEXT_PUBLIC_LINKTEST + "/post/delete", {
        access_token: defaultValues.user,
        team_id: defaultValues.team.team_id,
        post_id: post_id,
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

  const leaveTeam = async () => {
    
    axios
      //wait ton
      .post(process.env.NEXT_PUBLIC_LINKTEST + "/privilege/UserleftTeam", {
        access_token: defaultValues.user,
        team_id: defaultValues.team.team_id,
      })
      .then(function (response) {
        console.log(response);
        if (response.data === "200 OK") {
          //wait ton
          toHomepage();
        } else {
          //dev page add
          console.log("somehow wrong");
        }
      });
  };

  const handleDeletePost = (index) => {
    console.log(index);
    setShowDeletePost((prevShowOption) => {
      const newshowDeletePost = [...prevShowOption];
      newshowDeletePost[index] = !newshowDeletePost[index];
      return newshowDeletePost;
    });
  };

  const handleShowDel = () => {
    setshowDelPostPage(!showDelPostPage);
  };

  const handleConfirmDelPost = (post_id) => {
    delPost(post_id);
  };

  const validate = (value) => {
    let err = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (email === "") {
      err["Email"] = "Please enter your email";
    } else if (!regex.test(email)) {
      err["Email"] = "Incorrect Format";
    }
    console.log("error ->", err);
    return err;
  };

  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);

  const toHomepage = useCallback(() => {
    router.push({
      pathname: "/User",
      query: { team_id: team_id },
    });
  }, [router]);

  const toManagementTeam = useCallback(
    (team_id) => {
      router.push({
        pathname: "/User/Team/Team_management",
        query: { team_id: team_id },
      });
    },
    [router]
  );

  const toPostPage = useCallback((post_id) => {
    router.push({
      pathname: "/User/Team/Post",
      query: { post_id: post_id, team_id: defaultValues.team.team_id },
    });
  });
  let time = 1;
  useEffect(() => {
    document.body.style.backgroundColor = "#FFFCFC";
    //only for test fron
    const fecthData = async () => {
      try {
        await sendToken();
      } catch (error) {
        console.error("Error sending token:", error);
      }
    };
    // waiting for ton
    if (time === 1) {
      fecthData();
      time--;
    }
    if (token === "null") {
      router.push({
        pathname: "/sign_in",

      });
    }
  }, [team_id]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleDropdownThreedoton = () => {
    setTreeDoton(!treedoton);
  };

  const handleDeleteTeam = () => {
    setDeleteTeam(!deleteTeam);
    //delTeam(team_id);
  };
  const handleConfirmDel = (team_id) => {
    delTeam(team_id);
  };
  const handleEditTeam = (team_id) => {
    //for test team_mangement
    toManagementTeam(team_id);
  };
  const handleLeaveTeam = () => {
    leaveTeam();
  };
  const handleInvite_member = () => {
    setShowinvite(!showinvite);
  };
  const handleDropdownChange = (event) => {
    setSelectedMemberinviteRole(event.target.value);
  };
  const handleSubmitInvite_member = (e) => {
    console.log(email, selectedMemberinviteRole);
    e.preventDefault();
    const error = validate(email);
    setFormErrors(error);
    console.log("check", Object.keys(error).length);
    if (Object.keys(error).length === 0) {
      Invite_member(email, selectedMemberinviteRole);
      setSelectedMemberinviteRole("User");
      setEmail("");
    }
  };

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

      <div className="font-Poppins flex">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          user={defaultValues.user}
          Team={defaultValues.sidebar_team}
        />
        <div className={`flex-1  ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
          <div className="border-b-4 border-blue-900 py-4">
            <div className="mt-[5rem] flex-1 ">
              <div className="flex py-0 md:py-4 mr-0 md:mr-4">
                <img
                  className={`invisible ${isSidebarOpen
                    ? "md:invisible md:h-0 md:w-0 lg:visible lg:w-auto lg:h-auto"
                    : "md:visible md:w-auto md:h-auto lg:w-auto lg:h-auto "
                    } 
                   h-0  ml-3 fill-red-300 rounded-md drop-shadow-xl `}
                  // src={extractImagePath(defaultValues.team.team_picture)}
                  src={teampic}
                  alt="SVG Image"
                />
              </div>
              <div className="flex flex-col ml-0 md:ml-2 mt-3 mr-8 ">
                <div className="flex ">
                  <img
                    className={`visible  ${isSidebarOpen
                      ? "md:visible md:w-auto md:h-auto lg:invisible lg:h-0  "
                      : "md:invisible md:w-0 md:h-0 lg:invisible"
                      } 
                   fill-red-300 rounded-md drop-shadow-xl `}
                    src={teampic}
                    // src="/Team_picture.png"
                    alt="SVG Image"
                  />
                </div>
                <div className="flex w-full justify-between mt-3 md:mt-3 ">
                  <div className="flex flex-rows  ">
                    <div className="mt-1 text-xl md:text-2xl font-semibold text-blue-900">
                      {defaultValues.team.team_name}
                    </div>
                    <div className="ml-3  text-xl text-white bg-blue-900 px-2 py-[0.3rem] rounded-md">
                      {defaultValues.team.role}
                    </div>
                    <div className="ml-3  text-xl text-white bg-blue-900 px-2 py-[0.3rem] rounded-md">
                      {defaultValues.team.team_count_member}
                    </div>
                  </div>
                  <button className="mr-5" onClick={handleDropdownThreedoton}>
                    <svg
                      width="30"
                      height="10"
                      viewBox="0 0 42 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.39159 9.6875C4.14619 9.6875 2.9518 9.19364 2.07117 8.31456C1.19053 7.43549 0.695801 6.2432 0.695801 5C0.695801 3.7568 1.19053 2.56451 2.07117 1.68544C2.9518 0.80636 4.14619 0.3125 5.39159 0.3125C6.63699 0.3125 7.83139 0.80636 8.71202 1.68544C9.59265 2.56451 10.0874 3.7568 10.0874 5C10.0874 6.2432 9.59265 7.43549 8.71202 8.31456C7.83139 9.19364 6.63699 9.6875 5.39159 9.6875ZM21.0442 9.6875C19.7988 9.6875 18.6044 9.19364 17.7238 8.31456C16.8432 7.43549 16.3484 6.2432 16.3484 5C16.3484 3.7568 16.8432 2.56451 17.7238 1.68544C18.6044 0.80636 19.7988 0.3125 21.0442 0.3125C22.2896 0.3125 23.484 0.80636 24.3647 1.68544C25.2453 2.56451 25.74 3.7568 25.74 5C25.74 6.2432 25.2453 7.43549 24.3647 8.31456C23.484 9.19364 22.2896 9.6875 21.0442 9.6875ZM36.6969 9.6875C35.4515 9.6875 34.2571 9.19364 33.3764 8.31456C32.4958 7.43549 32.0011 6.2432 32.0011 5C32.0011 3.7568 32.4958 2.56451 33.3764 1.68544C34.2571 0.80636 35.4515 0.3125 36.6969 0.3125C37.9423 0.3125 39.1367 0.80636 40.0173 1.68544C40.8979 2.56451 41.3927 3.7568 41.3927 5C41.3927 6.2432 40.8979 7.43549 40.0173 8.31456C39.1367 9.19364 37.9423 9.6875 36.6969 9.6875Z"
                        fill="#060640"
                      />
                    </svg>
                  </button>
                  {treedoton && (
                    <div className="right-5 absolute z-10 mt-10">
                      <div className=" flex-auto overflow-hidden rounded-3xl bg-white text-sm  shadow-lg ring-1 ring-gray-900/5">
                        <div className="group relative flex  rounded-lg p-4 ">
                          <div>
                            {defaultValues.team.role === "Owner" && (
                              <div>
                                <button
                                  id="delTeam"
                                  className="relative py-2 font-semibold text-red-600 text-lg "
                                  onClick={handleDeleteTeam}
                                >
                                  Delete Team
                                </button>
                                {deleteTeam && (
                                  <div
                                    className="relative z-10 "
                                    aria-labelledby="modal-title"
                                    role="dialog"
                                    aria-modal="true"
                                  >
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 md:w-full md:max-w-xl">
                                          <div className="p-6">
                                            <h3
                                              className="text-2xl font-semibold leading-6 text-gray-900 p-3 text-red-600"
                                              id="modal-title"
                                            >
                                              Warning
                                            </h3>
                                            <div className="px-3 text-xl">
                                              Delete this Team also removes all
                                              Post, and their resources.
                                              <span className="font-bold text-red-600">
                                                Removed Team can not be
                                                restored!
                                              </span>
                                            </div>

                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                              <button
                                                id="cfDelTeam"
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 sm:ml-3 sm:w-auto"
                                                onClick={() =>
                                                  handleConfirmDel(
                                                    defaultValues.team.team_id
                                                  )
                                                }
                                              >
                                                Confirm Delete
                                              </button>
                                              <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-blue-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  hover:text-white sm:mt-0 sm:w-auto"
                                                onClick={() => {
                                                  handleDeleteTeam(),
                                                    handleDropdownThreedoton();
                                                }}
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            {(defaultValues.team.role === "Owner" ||
                              defaultValues.team.role === "Admin") && (
                                <div>
                                  <button
                                    id="editTeam"
                                    className="font-semibold text-gray-700 text-lg py-2"
                                    type="button"
                                    onClick={() =>
                                      handleEditTeam(defaultValues.team.team_id)
                                    }
                                  >
                                    Edit Team
                                  </button>
                                </div>
                              )}
                            {(defaultValues.team.role === "User" ||
                              defaultValues.team.role === "Admin") && (
                                <div>
                                  <button
                                    className="font-semibold text-gray-700 text-lg py-2"
                                    type="button"
                                    onClick={() => handleLeaveTeam()}
                                  >
                                    Leave Team
                                  </button>
                                </div>
                              )}
                            <div>
                              <button
                                id="inviteTeam"
                                className="font-semibold text-gray-700 text-lg py-2"
                                type="button"
                                onClick={handleInvite_member}
                              >
                                Invite Member
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className=" mt-4">
                  {defaultValues.team.team_description}
                </div>
              </div>
              {showinvite && (
                <div
                  className="relative z-10"
                  aria-labelledby="modal-title"
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                              <div className="flex mt-3">
                                {errMsg ? (
                                  <p
                                    id="errMsgInvite"
                                    className="flex item-center text-red-900 text-xl"
                                    aria-live="assertive"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={5}
                                      stroke="currentColor"
                                      className="h-5 w-5 md:w-7.5 md:h-7.5 mr-2 md:mr-2 mt-0.5 md:mt-2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                    {errMsg}
                                  </p>
                                ) : null}
                              </div>
                              <h3
                                className="text-xl font-semibold leading-6 text-gray-900 mb-5"
                                id="modal-title"
                              >
                                Invite Member
                              </h3>
                              <div>
                                <p className="text-sm md:text-lg text-gray-500 mb-3">
                                  You can invite your friend here!!!
                                </p>
                              </div>
                              <div className="md:w-[28rem]">
                                <label
                                  id="inviteEmail"
                                  htmlFor="Email"
                                  className="block text-sm leading-6 font-bold text-gray-900 md:text-lg mb-2 "
                                >
                                  Enter Email
                                </label>
                                <input
                                  id="email"
                                  type="email"
                                  placeholder="Email"
                                  autoComplete="off"
                                  // pattern="[A-Za-z0-9]"
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                  className="input-input-signup mb-2"
                                />
                                <p className="text-red-600 mb-2">
                                  {formErrors.Email}
                                </p>
                                <label
                                  
                                  htmlFor="role"
                                  className="block text-sm leading-6 text-gray-900 font-bold  md:text-lg mb-2 "
                                >
                                  select role
                                </label>
                                {((defaultValues.team.role === "Owner" || defaultValues.team.role === "Admin") && (
                                  <div>
                                    <select
                                      id="invite-members-dropdown"
                                      className="gl-form-select custom-select input-input-signup"
                                      data-qa-selector="access_level_dropdown"
                                      aria-describedby="__BVID__791__BV_description_"
                                      onChange={handleDropdownChange}
                                      value={selectedMemberinviteRole}
                                    >
                                      <option value="User">User</option>
                                      <option value="Admin">Admin</option>
                                    </select>
                                  </div>
                                )) || (
                                    <div>
                                      <select
                                        id="invite-members-dropdown"
                                        className="gl-form-select custom-select input-input-signup"
                                        data-qa-selector="access_level_dropdown"
                                        aria-describedby="__BVID__791__BV_description_"
                                        onChange={handleDropdownChange}
                                        value={selectedMemberinviteRole}
                                      >
                                        <option value="User">User</option>
                                      </select>
                                    </div>
                                  )}

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            id="submitInvite"
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                            onClick={handleSubmitInvite_member}
                          >
                            Invite
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto"
                            onClick={() => {
                              handleInvite_member(), handleDropdownThreedoton();
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 mt-2">
            <Create_post team_id={defaultValues.team.team_id}></Create_post>
          </div>
          {showPost ? (
            <ul className="relative space-y-5 mt-7">
              {defaultValues.post.map((post, index) => (
                <li
                  id="post"
                  key={index}
                  className="z-0"
                  onClick={() => toPostPage(post.Post_id)}
                >
                  <div className="p-4 border-2 ml-4 mr-4 border-blue-900 rounded-md">
                    <div className="flex justify-between">
                      <div className="flex flex-rows">
                      <img className="h-10 w-10 mt-[0.35rem] rounded-full" src={extractUserImagePath(post.Post_user_image)} alt="" />
                        
                        <div className="ml-7 ">
                          <div className="text-xl font-bold">
                            {post.Post_user}
                          </div>
                          <div className="mt-1 text-slate-400">
                            {
                              new Date(post.Post_Date)
                                .toISOString()
                                .split("T")[0]
                            }
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          id="DeletePost"
                          className="mr-5"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(index);
                          }}
                        >
                          <svg
                            width="30"
                            height="10"
                            viewBox="0 0 42 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.39159 9.6875C4.14619 9.6875 2.9518 9.19364 2.07117 8.31456C1.19053 7.43549 0.695801 6.2432 0.695801 5C0.695801 3.7568 1.19053 2.56451 2.07117 1.68544C2.9518 0.80636 4.14619 0.3125 5.39159 0.3125C6.63699 0.3125 7.83139 0.80636 8.71202 1.68544C9.59265 2.56451 10.0874 3.7568 10.0874 5C10.0874 6.2432 9.59265 7.43549 8.71202 8.31456C7.83139 9.19364 6.63699 9.6875 5.39159 9.6875ZM21.0442 9.6875C19.7988 9.6875 18.6044 9.19364 17.7238 8.31456C16.8432 7.43549 16.3484 6.2432 16.3484 5C16.3484 3.7568 16.8432 2.56451 17.7238 1.68544C18.6044 0.80636 19.7988 0.3125 21.0442 0.3125C22.2896 0.3125 23.484 0.80636 24.3647 1.68544C25.2453 2.56451 25.74 3.7568 25.74 5C25.74 6.2432 25.2453 7.43549 24.3647 8.31456C23.484 9.19364 22.2896 9.6875 21.0442 9.6875ZM36.6969 9.6875C35.4515 9.6875 34.2571 9.19364 33.3764 8.31456C32.4958 7.43549 32.0011 6.2432 32.0011 5C32.0011 3.7568 32.4958 2.56451 33.3764 1.68544C34.2571 0.80636 35.4515 0.3125 36.6969 0.3125C37.9423 0.3125 39.1367 0.80636 40.0173 1.68544C40.8979 2.56451 41.3927 3.7568 41.3927 5C41.3927 6.2432 40.8979 7.43549 40.0173 8.31456C39.1367 9.19364 37.9423 9.6875 36.6969 9.6875Z"
                              fill="#060640"
                            />
                          </svg>
                        </button>
                        {showDeletePost[index] && (
                          <div>
                            {defaultValues.team.role === "Owner" ||
                              defaultValues.team.role === "Admin" ||
                              defaultValues.team.user_id === post.user_id ? (
                              <div className="right-5 absolute z-20 ">
                                <div className=" flex-auto overflow-hidden rounded-3xl bg-white text-sm  shadow-lg ring-1 ring-gray-900/5">
                                  <div className="group relative flex  rounded-lg p-4 ">
                                    <div>
                                      <div>
                                        <button
                                          id="CFDeletePost"
                                          className="relative py-2 font-semibold text-red-600 text-lg "
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleShowDel();
                                          }}
                                        >
                                          Delete Post
                                        </button>
                                        {showDelPostPage && (
                                          <div
                                            className=" z-50 "
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 "></div>

                                            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                                              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 md:w-full md:max-w-xl">
                                                  <div className="p-6">
                                                    <h3
                                                      className="text-2xl font-semibold leading-6 text-gray-900 p-3 text-red-600"
                                                      id="modal-title"
                                                    >
                                                      Warning
                                                    </h3>
                                                    <div className="px-3 text-xl">
                                                      Delete this Post also
                                                      removes Post, and their
                                                      resources.
                                                      <span className="font-bold text-red-600">
                                                        Removed Post can not be
                                                        restored!
                                                      </span>
                                                    </div>

                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                      <button
                                                        id="CFCFDeletePost"
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 sm:ml-3 sm:w-auto"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          handleConfirmDelPost(
                                                            post.Post_id
                                                          );
                                                        }}
                                                      >
                                                        Confirm Delete
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-blue-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  hover:text-white sm:mt-0 sm:w-auto"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          handleShowDel();
                                                          handleDeletePost(
                                                            index
                                                          );
                                                        }}
                                                      >
                                                        Cancel
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 text-xl ml-[4.5rem]">
                      {post.Post_description}
                    </div>
                    <div className="">
                      <img
                        className="ml-[4.5rem] max-w-[15rem] md:max-w-[30rem] lg:max-w-[35rem] mt-5 "
                        src={extractThumnailPath(post.thumbnail)}
                      ></img>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
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
                It looks like not any posts here.
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {loading && (
          <Loading />
        )}
      </div>
      <button
        className={`invisible md:visible fixed bottom-4 ${isSidebarOpen ? "left-48" : "left-6"
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
    </div>
  );
};

export default Team;
