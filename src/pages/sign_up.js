import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { resolve } from "styled-jsx/css";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

const Sign_up = () => {
  const userRef = useRef();
  const errRef = useRef();
  const api = process.env.NEXT_PUBLIC_LINKTEST + "/users/register";

  const {login,token} = useAuth();
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setpwd] = useState("");
  const [cfpwd, setCFpwd] = useState("");
  const [birthday, setBirthDay] = useState("");
  var test = "jim";
  const [formErrors, setFormErrors] = useState({});
  const [errMsg, setErrMsg] = useState("");

  const router = new useRouter();
  const toHome = useCallback(() => {
    router.push("/User");
  }, [router]);

  const toSignin = useCallback(() =>{
    router.push("/sign_in");
  }, [router])

  //birthday
  let nowYear = new Date().getFullYear();
  let dataYear = birthday.slice(0, 4);
  let thaiYear = (parseInt(dataYear) + 543).toString();
  let month = birthday.slice(5, 7);
  let day = birthday.slice(8, 10);
  let dateAll = thaiYear + "-" + month + "-" + day;

  let result = nowYear - parseInt(dataYear);

  const defaultValues = {
    Fname: fname,
    Lname: lname,
    Username: user,
    Email: email,
    Password: pwd,
    Birthday: dateAll,
  };

  const Sign_up = () => {
    console.log("error", formErrors["FName"]);
    console.log(defaultValues, errMsg);
    console.log(process.env.NEXT_PUBLIC_USERNAME, defaultValues.Fname);
    // online test
    // if (defaultValues.Fname === process.env.NEXT_PUBLIC_USERNAME ){
    //     setErrMsg("username has already been used")
    // }
    axios
      .post(api, {
        firstname: defaultValues.Fname,
        lastname: defaultValues.Lname,
        username: defaultValues.Username,
        email: defaultValues.Email,
        password: defaultValues.Password,
        birthday: defaultValues.Birthday,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "200 OK") {
          toSignin();
          //localStorage.setItem("token", response.data.token);
        } else if (response.data.status === "200 UE") {
          setErrMsg("username has already been used.");
        } else if (response.data.status === "200 EE") {
          setErrMsg("Email has already been used.");
        } else if (response.data.status === "200 UEE") {
          setErrMsg("username and Email has already been used.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const validate = (value) => {
    let err = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const lan_regex = /^[A-Za-z]+$/;

    if (fname === "") {
      err["FName"] = "Please enter your firstname";
    } else if (!lan_regex.test(fname)) {
      err["FName"] = "Firstname must be in English";
    }
    if (lname === "") {
      err["LName"] = "Please enter your lastname";
    } else if (!lan_regex.test(lname)) {
      err["LName"] = "Lastname must be in English";
    }
    if (birthday === "") {
      err["Birthday"] = "Please enter your date of birth";
    } else if (result < 13) {
      err["Birthday"] = "Age must be over 13 years.";
    }
    if (email === "") {
      err["Email"] = "Please enter your email";
    } else if (!regex.test(email)) {
      err["Email"] = "Incorrect Format";
    }
    if (user === "") {
      err["UserName"] = "Please Enter your Username";
    } else if (!/^[A-Za-z][A-Za-z0-9_]+$/.test(user)) {
      err["UserName"] = "Please enter a username with English, numbers or _";
    } else if (user.length < 4) {
      err["UserName"] = "Username must be 4 or more characters.";
    } else if (user.length > 24) {
      err["UserName"] = "Username must not exceed 24 characters.";
    }
    if (pwd === "") {
      err["Password"] = "Please enter your password.";
    } else if (pwd.length < 8) {
      err["Password"] = "Password must be 8 characters or more.";
    } else if (pwd.length > 24) {
      err["Password"] = "Password must not exceed 24 characters.";
    }
    if (cfpwd === "") {
      err["comfirmPassword"] = "Please enter your password.";
    } else if (cfpwd !== pwd) {
      err["comfirmPassword"] = "Incorrect Password";
    }
    console.log("error -> ", err);
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate(defaultValues);
    setFormErrors(error);
    console.log("check", Object.keys(error).length);
    if (Object.keys(error).length === 0) {
      Sign_up();
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
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 font-Poppins ">
          <div className="flex flex-col grid justify-items-center ">
          <svg
              width="38"
              height="38"
              viewBox="0 0 79 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:h-[5rem] md:w-[5rem] justify-center"
            />
            <h2 className=" text-2xl md:text-4xl font-bold leading-9 tracking-tight text-gray-900 mt-6">
              Welcome to LipSense
            </h2>
            <div className="flex mt-3">
              {errMsg ? (
                <p
                  ref={errRef}
                  id="errMsg"
                  className="flex item-center text-red-900 text-md md:text-2xl bg-red-500 rounded-md text-white px-5 py-3 font-bold mt-3"
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
          </div>
          <div className="mt-5 grid justify-items-stretch ">
            <form
              className="space-y-3 w-[19rem] md:w-[40rem] justify-self-center"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col md:flex-row ">
                <div className="w-[19rem] mr-[2rem]">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium leading-6 text-gray-900 md:text-2xl mb-2"
                  >
                    Enter your Firstname
                  </label>
                  <input
                    id="FirstName"
                    type="text"
                    ref={userRef}
                    placeholder="FirstName"
                    autoComplete="off"
                    onChange={(e) => setFName(e.target.value)}
                    value={fname}
                    className="input-input-signup"
                  />
                  <p className="text-red-600">{formErrors.FName}</p>
                </div>
                <div className="w-[19rem]">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium leading-6 text-gray-900 md:text-2xl mb-2"
                  >
                    Enter your LastName
                  </label>
                  <input
                    id="LastName"
                    type="text"
                    ref={userRef}
                    placeholder="LastName"
                    autoComplete="off"
                    onChange={(e) => setLName(e.target.value)}
                    value={lname}
                    className="input-input-signup"
                  />
                  <p className="text-red-600">{formErrors.LName}</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="Username"
                  className="block text-sm font-medium leading-6 text-gray-900 md:text-2xl mb-2"
                >
                  Enter Your Username
                </label>
                <input
                  id="username"
                  type="text"
                  ref={userRef}
                  placeholder="Username"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  className="input-input-signup"
                />
                <p className="text-red-600">{formErrors.UserName}</p>
              </div>
              <div>
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium leading-6 text-gray-900 md:text-2xl mb-2"
                >
                  Enter Your Email
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
                  className="input-input-signup"
                />
                <p className="text-red-600">{formErrors.Email}</p>
              </div>
              <div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 md:text-2xl mb-2"
                  >
                    Password
                  </label>
                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setpwd(e.target.value)}
                  value={pwd}
                  className="input-password"
                />
                <p id="errpwd" className="text-red-600">{formErrors.Password}</p>
              </div>

              <div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 md:text-2xl mb-2"
                  >
                    Confirm Your Password
                  </label>
                </div>

                <input
                  id="CFpassword"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setCFpwd(e.target.value)}
                  value={cfpwd}
                  className="input-password"
                />
                <p id = "errcfpwd" className="text-red-600">{formErrors.comfirmPassword}</p>
              </div>

              <div>
                <div>
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900 md:text-2xl mb-2"
                    htmlFor="Birthday"
                  >
                    Birth Date
                  </label>
                </div>
                <input
                  className="border border-gray-300 rounded text-gray-600 h-10 pl-5 pr-5 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                  name="Birthday"
                  id="Birthday"
                  type="date"
                  placeholder="Select Birthday"
                  value={birthday}
                  onChange={(event) => setBirthDay(event.target.value)}
                />
                <p className="text-red-600">{formErrors.Birthday}</p>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 mt-8 text-sm md:text-xl font-semibold
               leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
               focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sign_up;
