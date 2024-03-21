import Loading from "@/components/Loading";
import User_Navbar from "@/components/User_Navbar";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

const CreateTeam = () => {
  const TeamRef = useRef();
  const userRef = useRef();
  const [showTeam, setshowTeam] = useState([]);
  const [tname, setTname] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showinvite, setShowinvite] = useState(false);
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("User");
  const [image,setImage] = useState("");
  const invite = [];
  //wating api
  


  const router = useRouter();
  const { token } = useAuth()
  const user = token
  const toHome = useCallback(() =>{
    router.push({
      pathname : "/User",
    });
  },[router]);

  const Create_Team = async () =>{
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/team/create";
    // const api = process.env.NEXT_PUBLIC_LINKTEST + "/video/test";
    console.log(api)

    const formData = new FormData();
    console.log(defaultValues)


    formData.append("access_token",defaultValues.user)
    formData.append("team_name",defaultValues.Teamname)
    formData.append("team_description",defaultValues.TeamDescription)
    formData.append("file",defaultValues.Image)
    // const jsonData = JSON.stringify(defaultValues.member);
    // console.log(jsonData.length)
    // formData.append("member",jsonData)

    console.log(formData)
    setLoading(true)
    await axios
      .post(api, 
        formData,
         {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.data === "200 OK") {
          setLoading(false)
          toHome();
          localStorage.setItem("token", response.data.token);
        } else if(response.data === "200 team name used"){
          //here
          console.log('err')
        }
        else {
          console.log('err')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  

  const defaultValues = {
    user: user,
    Teamname:tname,
    TeamDescription:teamDescription,
    Image:image,
    member:showTeam
  };


  const Invite_member = (email, selectedRole) => {

    const api = process.env.NEXT_PUBLIC_LINKTEST + "/users/checkUser";
    axios
      .post(api, {
        access_token: defaultValues.user,
        email: email,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          const newmember = { Email: email, Role: selectedRole };
          const newInviteList = [...showTeam, newmember];
          console.log(newInviteList)
          setshowTeam(newInviteList);
        } else  {
          console.log('err')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // local test
          // const newmember = { Email: email, Role: selectedRole };
          // const newInviteList = [...showTeam, newmember];
          // setshowTeam(newInviteList);
    const jsonData = JSON.stringify(defaultValues.member)
    console.log(jsonData)
  };

  console.log(invite);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file)

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
  const handleInvite_member = () => {
    setShowinvite(!showinvite);
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
  
  const handleSubmitInvite_member = (e) => {
    console.log(email, selectedRole);
    e.preventDefault();
    const error = validate(email);
    setFormErrors(error);
    console.log("check", Object.keys(error).length);
    if (Object.keys(error).length === 0) {
      setShowinvite(!showinvite);
      Invite_member(email, selectedRole);
      setSelectedRole("User");
      setEmail("");
    }
  };

  const createteam = (e) =>{
    e.preventDefault();
    Create_Team()
  }

  const handleDropdownChange = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    if (token === "null"){
      router.push({
        pathname: "/",
        
      });}
    document.body.style.backgroundColor = "#cbd5e1";
  });

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
        <div className="flex justify-center py-9 mt-[4.5rem]">
          <form className="flex flex-col  md:w-auto  h-auto bg-white rounded-md font-Poppins drop-shadow-2xl"
          onSubmit={createteam}>
            <div className="py-5 px-5 font-bold text-xl md:text-4xl">
              Create Your Team !!!
            </div>
            <div className="flex flex-col  h-auto  border-t-2 border-blue-900 py-10 px-10  md:w-[45rem] lg:w-[60rem] xl:w-[100rem]">
              <label
                htmlFor="TeamName"
                className=" block text-lg font-medium leading-6 text-gray-900 md:text-xl mb-5"
              >
                Team Name
              </label>
              <input
                id="TeamName"
                type="text"
                ref={TeamRef}
                placeholder="Team Name"
                autoComplete="off"
                onChange={(e) => setTname(e.target.value)}
                value={tname}
                className="input-input-signup"
              />
              <div className="flex justify-between">
                <label className="block text-xl font-medium leading-6 text-gray-900 mt-5 mb-5">
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
                    className="flex flex-row bg-blue-800 border-2 border-slate-300 text-white font-[Poppins] py-1 px-2  rounded-md 
                      hover:bg-blue-950 text-md  font-Poppins mt-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={0.8}
                      stroke="currentColor"
                      className="w-5 stroke-blue-900 fill-white md:mr-3"
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
                    className="mt-2"
                  />
                </div>
              )}
              <label
                htmlFor="TeamDescription"
                className="block text-xl font-medium leading-6 text-gray-900  mb-5"
              >
                Team Description
              </label>
              <textarea
                id="TeamDescription"
                placeholder="Team Description"
                onChange={(e) => setTeamDescription(e.target.value)}
                value={teamDescription}
                className="input-input-signup"
              />
              {/* <div className="flex justify-between">
                <label
                  htmlFor="Invite_member"
                  className="block text-xl font-medium leading-6 text-gray-900  mt-5 mb-5"
                >
                  Invite Member{" "}
                  <span style={{ color: "#9ca3af" }}>(optional)</span>
                </label>
                <div
                  className="flex flex-row bg-blue-800 text-white font-[Poppins] py-2 px-4  rounded-md mt-5 mb-5 
                      hover:bg-blue-950 text-lg  font-Poppins"
                  onClick={handleInvite_member}
                >
                  <svg
                    width="29"
                    height="18"
                    viewBox="0 0 29 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-2 md:mt-1 md:mr-4"
                  >
                    <path
                      d="M22.2236 14.833V17.1663H8.19884V14.833C8.19884 14.833 8.19884 10.1663 15.2112 10.1663C22.2236 10.1663 22.2236 14.833 22.2236 14.833ZM18.7174 4.33301C18.7174 3.64077 18.5118 2.96409 18.1265 2.38851C17.7413 1.81294 17.1937 1.36434 16.553 1.09943C15.9123 0.834524 15.2073 0.765213 14.5272 0.900261C13.8471 1.03531 13.2223 1.36865 12.732 1.85814C12.2416 2.34762 11.9077 2.97126 11.7724 3.65019C11.6371 4.32913 11.7066 5.03286 11.9719 5.6724C12.2373 6.31194 12.6867 6.85857 13.2633 7.24315C13.8399 7.62774 14.5178 7.83301 15.2112 7.83301C16.1411 7.83301 17.0329 7.46426 17.6905 6.80788C18.348 6.15151 18.7174 5.26127 18.7174 4.33301ZM22.4574 10.2363C23.0962 10.8247 23.6113 11.5342 23.9725 12.3234C24.3337 13.1126 24.5338 13.9658 24.5611 14.833V17.1663H28.0673V14.833C28.0673 14.833 28.0673 10.808 22.4574 10.2363ZM21.0549 0.833009C20.7018 0.83322 20.3508 0.888325 20.0147 0.996342C20.6985 1.97514 21.0651 3.13972 21.0651 4.33301C21.0651 5.5263 20.6985 6.69088 20.0147 7.66967C20.3508 7.77769 20.7018 7.8328 21.0549 7.83301C21.9848 7.83301 22.8766 7.46426 23.5341 6.80788C24.1917 6.15151 24.5611 5.26127 24.5611 4.33301C24.5611 3.40475 24.1917 2.51451 23.5341 1.85814C22.8766 1.20176 21.9848 0.833009 21.0549 0.833009ZM9.36757 6.66634H5.86138V3.16634H3.52392V6.66634H0.0177307V8.99968H3.52392V12.4997H5.86138V8.99968H9.36757V6.66634Z"
                      fill="white"
                    />
                  </svg>
                  <div className="hidden md:block">invite member</div>
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
                                  htmlFor="Email"
                                  className="block text-sm leading-6 font-bold text-gray-900 md:text-lg mb-2 "
                                >
                                  Enter Email
                                </label>
                                <input
                                  id="email"
                                  type="email"
                                  ref={userRef}
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
                                <div>
                                  <select
                                    id="invite-members-dropdown"
                                    className="gl-form-select custom-select input-input-signup"
                                    data-qa-selector="access_level_dropdown"
                                    aria-describedby="__BVID__791__BV_description_"
                                    onChange={handleDropdownChange}
                                    value={selectedRole}
                                  >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                            onClick={handleSubmitInvite_member}
                          >
                            Invite
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto"
                            onClick={handleInvite_member}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showTeam.map((member, index) => (
                                  <li key={index}>

                <div className="mb-5 flex items-center justify-between ml-5 w-auto mr-6 h-14 bg-white rounded-md border border-blue-950 ">
                  <div className="flex flex-row items-center">
                    <img
                      className="h-7 w-7  ml-3 fill-red-300 "
                      src="template.png"
                      alt="SVG Image"
                    />
                    <div className="ml-3">{member.Email}</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex items-center  w-auto px-3 h-7 bg-white rounded-md border-2 border-blue-950 ">
                      {member.Role}
                    </div>
                    <svg
                      width="6"
                      height="26"
                      viewBox="0 0 6 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3 ml-3"
                    >
                      <circle cx="3" cy="3" r="2" fill="#1E3A8A" />
                      <circle cx="3" cy="13" r="2" fill="#1E3A8A" />
                      <circle cx="3" cy="23" r="2" fill="#1E3A8A" />
                    </svg>
                  </div>
                </div>
                </li>
              ))} */}

              <div>
                <button
                  type="submit"
                  className="flex mt-5 w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm md:text-xl font-semibold
               leading-6 text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
               focus-visible:outline-indigo-600"
                >
                  Create Team
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
