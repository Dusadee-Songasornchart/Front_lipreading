import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import User_Navbar from "@/components/User_Navbar";

const Profile = () => {
  const [pic, setpic] = useState("");
  const [image,setImage] = useState("");
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [showEditPwd, setShowEditPwd] = useState(false);
  const [pwd, setpwd] = useState("");
  const [newpwd, setnewpwd] = useState("");
  const [cfnewpwd, setCFnewpwd] = useState("");
  const [errpwd, setErrPwd] = useState("");
  const [errnewpwd, setErrNewpwd] = useState("");
  const [errcfnewpwd, setErrCFNewpwd] = useState("");
  const [showDelAccount, setShowDelAccount] = useState(false);
  const { logout, token } = useAuth();
  let time = 1;

  const router = useRouter();

  const defaultValues = {
    user: token,
    username: username,
    email: email,
    birthday: birthday,
  };

  const sendToken = () => {
    // const user = {
    //   username: "Jimmy_3",
    //   email: "Jimmy@gmail.com",
    //   birth_date: "2001-01-11",
    // };
    // setUsername(user.username);
    // setEmail(user.email);
    // setBirthDay(user.birth_date);
    // setpic("/Profile_user.png");
    // setUser(user);
    // console.log(token);
    //
    axios
      .post(process.env.NEXT_PUBLIC_LINKTEST + "/profile/profileInfo", {
        access_token: token,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "200 OK") {
          //wait ton
          setUsername(response.data.username);
          setEmail(response.data.email);
          setBirthDay(response.data.birthdate);
          setpic(extractImagePath(response.data.profile_image_path));
        } else {
          console.log("error");
        }
      });
  };
  const extractImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_USER_IMAGE+fullPath
    console.log(newPath)
    return newPath;
  };
  const Edit_user = () => {
    //waiting api ton
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/profile/EditProfile";
    console.log(defaultValues);
    //waiting for ton
    const formData = new FormData();
    console.log(defaultValues);
    console.log("new",image)

    formData.append("access_token", defaultValues.user);
    formData.append("username", defaultValues.username,);
    formData.append("email", defaultValues.email);
    formData.append("birthday", defaultValues.birthday);
    formData.append("file", image);


    axios
      .post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.data === "200 OK"){
            toReloadPage();
        }else if (response.data === "403 Forbidden"){
          console.log("you don't have permission")
        }else{
            console.log("error save change")
        }
      });
  };

  const changePwd = () => {
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/profile/change_password";
    console.log(pwd, newpwd, cfnewpwd);

    //waiting for ton
    axios
      .post(api, {
        access_token: defaultValues.user,
        old_password : pwd,
        new_password : newpwd,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "200 OK"){
          setErrPwd("")
          toReloadPage();
        }else if (response.data.status === "300 W"){
          setErrPwd("Wrong password")
        }
        else{
            console.log("error save change")
            setErrPwd("Wrong password");

        }
    });
  };

  const DelAccount = () => {
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/profile/delete_account ";
    console.log(defaultValues.user);
    
    //waiting for ton
    axios
      .post(api, {
        access_token: defaultValues.user,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "200 OK"){
          logout();
          toSignin();
        }else{
            console.log("error save change")
        }
      });
  };

  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);

  const toSignin = useCallback(() => {
    router.push({
      pathname: "/sign_in",
    });
  }, [router]);

  const handleEditUser = () => {
    console.log(username, email, birthday);
    Edit_user();
  };

  const handleShowDelAccount = () => {
    console.log(showDelAccount);
    setShowDelAccount(!showDelAccount);
  };

  const handleEditPwd = () => {
    setShowEditPwd(!showEditPwd);
    console.log(showEditPwd);
  };

  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    setImage(file)
    
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        setpic(imageDataURL);
        console.log("image", imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    if (pwd === "") {
      console.log("case 0");
      setErrPwd("Please enter your password.");
    } else {
      setErrPwd("");
    }
    if (newpwd === "") {
      console.log("case 1");
      setErrNewpwd("Please enter your password.");
    } else if (newpwd.length < 8) {
      console.log("case 2");
      setErrNewpwd("Password must be 8 characters or more.");
    } else if (newpwd.length > 24) {
      console.log("case 3");
      setErrNewpwd("Password must not exceed 24 characters.");
    } else {
      console.log("case 6");
      setErrNewpwd("");
    }
    if (cfnewpwd === "") {
      console.log("case 4");
      setErrCFNewpwd("Please enter your password.");
    } else if (cfnewpwd !== newpwd) {
      console.log("case 5");
      setErrCFNewpwd("Incorrect Password");
    } else {
      console.log("case 6");
      setErrCFNewpwd("");
    }
  };

  const handlesetnewPwd = () => {
    console.log("okdddd");
    validate();
    if (errpwd === "" && errcfnewpwd === "" && errnewpwd === "") {
      changePwd();
    }
  };
  useEffect(() => {
    if (token === "null") {
      router.push({
        pathname: "/",
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
      <div className="font-Poppins mt-[5rem]">
        <div className="flex  items-center px-3 ">
          <div className="flex-1 border-b-2 py-3 mt-4">
            <div className="ml-8 text-blue-700 text-2xl font-bold ">
              Profile
            </div>
            <div className="ml-8 text-slate-400">
              you can upload new profile or change it here
            </div>
          </div>
        </div>
        {/* <form className="" onSubmit={handleEditUser}> */}
        <div className="items-center px-3  ">
          <div className="flex flex-col md:flex-row border-b-2 py-5">
            <div className="grid justify-items-center">
              <img
                
                className="h-[9rem] w-[9rem] ml-0 md:ml-8 rounded-full"
                src={pic}
                alt=""
              />
            </div>
            <div className="flex-1 items-center ml-5">
              <div className=" text-xl mb-7 mt-4 md:mt-1">
                Want to change your picture?
              </div>
              <div className="mb-7">
                <form>
                  <label htmlFor="fileInput"></label>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={(e) => handleUploadPic(e)}
                  />{" "}
                </form>
              </div>
              <div className="text-slate-400">
                the maximum file size is 200 KB
              </div>
            </div>
          </div>
        </div>
        <div className="items-center px-3  ">
          <div className="border-b-2 py-5">
            <div className="ml-8 text-xl font-bold text-blue-700 mb-5">
              Your Setting
            </div>

            <div className="flex flex-col  h-auto  px-10">
              <label
                htmlFor="Username"
                className=" block text-lg  leading-6 text-gray-900 md:text-lg mb-2 "
              >
                Username
              </label>
              <input
                id="TeamName"
                type="text"
                placeholder={user.username}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="edit-User"
              />
              <label
                htmlFor="Email"
                className=" block text-lg  leading-6 text-gray-900 md:text-lg mb-2 mt-2 "
              >
                Email
              </label>
              <input
                id="Email"
                type="email"
                placeholder={user.email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="edit-User"
              />
              <div>
                <label
                  className=" block text-lg  leading-6 text-gray-900 md:text-lg mb-2 mt-2 "
                  htmlFor="Birthday"
                >
                  Birth Date
                </label>
              </div>
              <input
                className="edit-User"
                name="Birthday"
                type="date"
                placeholder="Select Birthday"
                value={birthday}
                onChange={(event) => setBirthDay(event.target.value)}
              />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-white px-1 py-1 text-sm md:text-lg font-semibold mt-5
               leading-6 text-blue-950 hover:text-white shadow-sm hover:bg-blue-950 border-2 border-slate-300 md:w-2/5"
                  onClick={handleEditUser}
                >
                  Save change
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="px-3">
          <button
            className="flex w-full justify-center rounded-md px-1 py-1 text-sm md:text-lg font-semibold mt-5
               leading-6 text-white shadow-sm bg-blue-950 border-2 border-slate-300 "
            onClick={handleEditPwd}
          >
            Edit Password
          </button>
          {showEditPwd && (
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
                      <div className="">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3
                            className="text-xl font-semibold leading-6 text-gray-900 mb-5"
                            id="modal-title"
                          >
                            Change Your Password
                          </h3>
                          <div>
                            <div>
                              <div>
                                <label
                                  htmlFor="password"
                                  className="block text-sm font-medium leading-6 text-gray-900 md:text-lg mb-2"
                                >
                                  Enter your password
                                </label>
                              </div>

                              <input
                                id="password"
                                type="password"
                                placeholder="current password"
                                autoComplete="current-password"
                                onChange={(e) => setpwd(e.target.value)}
                                value={pwd}
                                className="input-password"
                              />
                              <p className="text-red-600 mt-1">{errpwd}</p>
                            </div>
                          </div>
                          <div className="flex-1 py-2 border-t-2 mt-3">
                            <div>
                              <div>
                                <label
                                  htmlFor="password"
                                  className="block text-sm font-medium leading-6 text-gray-900 md:text-lg mb-2"
                                >
                                  New password
                                </label>
                              </div>

                              <input
                                id="newpassword"
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(e) => setnewpwd(e.target.value)}
                                value={newpwd}
                                className="input-password"
                              />
                              <p className="text-red-600 mt-1">{errnewpwd}</p>
                            </div>

                            <div>
                              <div>
                                <label
                                  htmlFor="password"
                                  className="block text-sm font-medium leading-6 text-gray-900 md:text-lg mb-2 mt-2"
                                >
                                  Confirm Your new password
                                </label>
                              </div>

                              <input
                                id="CFpassword"
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(e) => setCFnewpwd(e.target.value)}
                                value={cfnewpwd}
                                className="input-password"
                              />
                              <p className="text-red-600 mt-1">{errcfnewpwd}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          handlesetnewPwd();
                        }}
                      >
                        Change Password
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto"
                        onClick={() => {
                          handleEditPwd();
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

          <button
            className="flex w-full justify-center rounded-md px-1 py-1 text-sm md:text-lg font-semibold mt-2
            leading-6 text-white shadow-sm bg-red-600 border-2 border-slate-300 "
            onClick={handleShowDelAccount}
          >
            Delete Account
          </button>
          {showDelAccount && (
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
                        Delete Account also removes all Post, and your
                        resources.
                        <span className="font-bold text-red-600">
                          Removed Account can not be restored!
                        </span>
                      </div>

                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 sm:ml-3 sm:w-auto"
                          onClick={DelAccount}
                        >
                          Confirm Delete
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-blue-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  hover:text-white sm:mt-0 sm:w-auto"
                          onClick={handleShowDelAccount}
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
        {/* </form> */}
      </div>
    </div>
  );
};
export default Profile;
