import Loading from "@/components/Loading";
import User_Navbar from "@/components/User_Navbar";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Team_management = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [showImage ,setShowImage] = useState("");
  const [teamname, setTeamname] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteTeam, setDeleteTeam] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [newimage,setNewImage] = useState("");
  const { token } = useAuth();

  const router = useRouter();
  const { team_id } = router.query;
  const user = token;

  const defaultValues = {
    user: user,
    teamid: team_id,
    teamname: teamname,
    teamdescription: teamDescription,
    teamData: teamData,
    Image: showImage,
    role: role,
  };

  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);

  const toHomepage = useCallback(() => {
    router.push({
      pathname: "/User",
      
    });
  }, [router]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewImage(file)

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        setSelectedImage(imageDataURL);
        console.log("image", imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendToken = async () => {
    //check token iden
    //test offline
    // const storedToken = localStorage.getItem("token");
    // console.log(storedToken, "storedToken");

    // if (storedToken !== "undefined") {
    //   console.log("storage", storedToken);
    //test local
    // const role = "Owner"
    // const team_data = {

    //     team_id: "3",
    //     team_name: "temw",
    //     picture_team: "yteh",
    //     role: "Owner",
    //     count_member: "3",
    //     team_des:"dfssdf"

    // }
    // setRole(role)
    // setTeamData(team_data)

    // for online
    console.log(team_id);
    if (team_id !== undefined) {
      axios
        .post(process.env.NEXT_PUBLIC_LINKTEST + "/team/editTeam", {
          access_token: defaultValues.user,
          team_id: team_id,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.status === "200 OK") {
            //wait ton
            if (response.data.length !== 0) {
              const team_data = response.data;
              setTeamname(response.data.team_name);
              setShowImage(extractImagePath(response.data.team_image));
              setTeamDescription(response.data.team_desc);
              setTeamData(team_data);
              console.log(response.data.user_role);
              setRole(response.data.user_role);
            } else {
              setshowTeam(false);
            }
          } else {
            setErrMsg("ERROR");
          }
        });
    }
  };

  const Edit_team = () => {
    //waiting api ton
    setLoading(true)
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/team/saveTeamInfo";
    //toReloadPage();
    //waiting for ton

    const formData = new FormData();
    console.log(defaultValues);
    console.log("new",newimage)

    formData.append("access_token", defaultValues.user);
    formData.append("team_id", team_id);
    formData.append("team_name", defaultValues.teamname);
    formData.append("team_description", defaultValues.teamdescription);
    formData.append("file", newimage);

    axios
      .post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.data === "200 OK") {
          setLoading(false)
          toReloadPage();
        } else if (response.data === "403 Forbidden") {
          console.log("you don't have permission");
        } else {
          console.log("error save change");
        }
      });
  };

  const delTeam = async (team_id) => {
    console.log(team_id);
    console.log(defaultValues.user,team_id);
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


  const handleEditTeam = (e) => {
    e.preventDefault();
    Edit_team();
  };
  const handleDeleteTeam = () => {
    setDeleteTeam(!deleteTeam);
  };
  const handleConfirmDel = (team_id) => {
    console.log(team_id)
    delTeam(team_id);
  };
  const handleEditMember = () => {
    toEditMemberPage();
  };
  const toEditMemberPage = useCallback(() => {
    router.push({
      pathname: "/User/Team/Team_EditMember",
      query: { team_id: defaultValues.teamid },
    });
  }, [router]);

  const extractImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_TEAM_IMAGE+fullPath
    console.log(newPath)
    return newPath;
  };
  let time = 1;
  useEffect(() => {
    if (user === null) {
      router.push({
        pathname: "/sign_in",
      });
    }
    const token = user;
    localStorage.setItem("token", token);
    document.body.style.backgroundColor = "#cbd5e1";
    console.log("ok");
    if (time === 1) {
      sendToken();
      time--;
    }
  }, [ team_id]);

  return (
    <div className="Create_team_background">
      <Head>
        <style>
          {`
           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=Oswald:wght@500&family=Poppins&family=Raleway:wght@100;600;700&display=swap');
          `}
        </style>
      </Head>
      <div>
        {loading && <Loading />}
        <User_Navbar user={defaultValues.user} />
        <div className="flex justify-center py-9 px-5 mt-[4.5rem]  ">
          <div className=" lg:w-[70rem] p-4 md:p-10 flex flex-col  md:w-auto  h-auto bg-white rounded-md border border-blue-950 font-Poppins">
            <img
              className="place-self-center"
              src={defaultValues.Image}
              alt=""
            ></img>
            <form
              className="flex flex-col  max-w-[70rem]  h-auto bg-blue-50 rounded-md border border-blue-950 font-Poppins mt-5"
              onSubmit={handleEditTeam}
            >
              <div className="py-5 px-10 text-xl md:text-2xl font-extrabold">
                Edit team
              </div>
              <div className="flex flex-col  h-auto  mb-10 px-10">
                <label
                  htmlFor="TeamName"
                  className=" block text-lg font-bold leading-6 text-gray-900 md:text-xl mb-5"
                >
                  Team Name
                </label>
                <input
                  id="TeamName"
                  type="text"
                  placeholder={teamData.team_name}
                  autoComplete="off"
                  onChange={(e) => setTeamname(e.target.value)}
                  value={teamname}
                  className="edit-Team"
                />

                <div className="flex justify-between">
                  <label className="block text-lg font-bold leading-6 text-gray-900 md:text-xl mt-5 mb-5">
                    Team Image
                  </label>
                  <input
                    id="TeamImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    className="hidden"
                  />

                  <div>
                    <label
                      htmlFor="TeamImage"
                      className="flex flex-row bg-white border-2 border-slate-300 text-blue-900 py-1 px-2  rounded-md 
                      hover:bg-blue-900 text-md hover:text-white font-bold mt-5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 25 20"
                        strokeWidth={0.8}
                        stroke="currentColor"
                        className="w-8 stroke-white fill-blue-900 md:mr-3 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                        />
                      </svg>
                      <div className="mt-1 hidden md:block">upload image</div>
                    </label>
                  </div>
                </div>
                {selectedImage && (
                  <div className="mb-5">
                    <img
                      src={selectedImage}
                      alt="Selected Team Image"
                      className="mt-2 lg:max-w-[65rem] max-h-[28rem]"
                    />
                  </div>
                )}
                <label
                  htmlFor="TeamName"
                  className=" block text-lg font-bold leading-6 text-gray-900 md:text-xl mb-5"
                >
                  Team Description
                </label>
                <textarea
                  id="TeamDescription"
                  placeholder={teamData.team_desc}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  value={teamDescription}
                  className="edit-Team"
                />
                <div>
                  <button
                    id="submitSave"
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm md:text-xl font-semibold mt-5
               leading-6 text-blue-950 hover:text-white shadow-sm hover:bg-blue-950 border-2 border-slate-300 lg:w-1/5"
                  >
                    Save change
                  </button>
                </div>
              </div>
            </form>
            <div className="flex justify-between">
              {defaultValues.role === "Owner" && (
                <div>
                  <button
                    className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm md:text-xl font-semibold mt-5
               leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
               focus-visible:outline-indigo-600 "
                    onClick={handleDeleteTeam}
                  >
                    Delete Team
                  </button>
                  {deleteTeam && (
                    <div
                      className="relative z-10"
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
                                Delete this Team also removes all Post, and
                                their resources.
                                <span className="font-bold text-red-600">
                                  Removed Team can not be restored!
                                </span>
                              </div>

                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 sm:ml-3 sm:w-auto"
                                  onClick={() =>
                                    handleConfirmDel(
                                      defaultValues.teamid
                                    )
                                  }
                                >
                                  Confirm Delete
                                </button>
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-blue-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  hover:text-white sm:mt-0 sm:w-auto"
                                  onClick={handleDeleteTeam}
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

              <button
                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm md:text-xl font-semibold mt-5
               leading-6 text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
               focus-visible:outline-indigo-600 w-2/5 lg:w-1/5"
                onClick={handleEditMember}
              >
                Edit member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team_management;
