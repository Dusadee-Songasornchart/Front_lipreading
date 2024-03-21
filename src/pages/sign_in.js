import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

const Sign_in = () => {
  const userRef = useRef();
  const errRef = useRef();
  const api = process.env.NEXT_PUBLIC_LINKTEST + "/auth/login";

  const { status, setStatus, login, token } = useAuth();
  const [user, setUser] = useState("");
  const [pwd, setpwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const router = new useRouter();
  const toHome = useCallback(() => {
    router.push({
      pathname: "/User",
    });
  }, [router]);
  const toWebAdmin = useCallback(() => {
    router.push({
      pathname: "/WebAdmin",
    });
  }, [router]);

  const defaultValues = {
    Username: user,
    Password: pwd,
  };
  const Login = () => {
    // console.log(defaultValues, errMsg);
    // // local test
    // if (
    //   defaultValues.Username === process.env.NEXT_PUBLIC_USERNAME &&
    //   defaultValues.Password === process.env.NEXT_PUBLIC_PASSWORD
    // ) {
    //   console.log("true");
    //   login(process.env.NEXT_PUBLIC_TOKEN);
    //   //toHome();
    //   toWebAdmin();
    // } else {
    //   setErrMsg("Incorrect username or password");
    //   console.log("false", errMsg);
    // }

    // online test
    console.log(api);
    axios
      .post(api, {
        username: defaultValues.Username,
        password: defaultValues.Password,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "200 OK") {
          //waiting for ton.....
          console.log("user");
          login(response.data.access_token);

          toHome();
        } else if (response.data.status === "200 OK WebAdmin") {
          console.log("web admin");
          login(response.data.access_token);

          toWebAdmin();
        } else if (response.data.status === "503 : Service unavailable") {
          setErrMsg("Your account have been blocked");
        } else {
          console.log("false", errMsg);
          setErrMsg("Incorrect username or password");
        }
      })
      .catch(function (error) {
        console.log("false", errMsg);
        setErrMsg("Incorrect username or password");
      });
  };
  useEffect(() => {
    console.log(status);
    userRef.current.focus;
    if (token !== "null" && token !== null) {
      //toHome();
      // toWebAdmin();
      axios
        .post(process.env.NEXT_PUBLIC_LINKTEST + "/web-admin/check-web-admin", {
          access_token: token,
        })
        .then(function (response) {
          console.log(response);
          if (response.data === "200 OK User") {
            toHome();
          } else if (response.data === "200 OK WebAdmin") {
            toWebAdmin();
          }
        });
    }
    // console.log("Token :", token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Login();
    setUser("");
    setpwd("");
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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 font-Poppins">
          <div className="flex flex-col grid justify-items-center ">
            {" "}
            <svg
              width="38"
              height="38"
              viewBox="0 0 79 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:h-[5rem] md:w-[5rem] justify-center"
            >
              <rect x="8" y="8" width="68" height="60" fill="white" />
              <path
                d="M12.7021 0.0631145C5.74363 0.745628 0.529714 6.20574 0.0688887 13.2909C-0.0561925 15.2344 0.00305651 64.9539 0.134721 65.7989C1.1222 72.286 5.90162 77.0279 12.3137 77.8859C13.6896 78.0712 66.2303 78.0159 67.198 77.8274C71.9149 76.9174 75.8023 74.0443 77.5863 70.1475C78.2447 68.7077 78.587 67.6254 78.8273 66.2214C78.982 65.3049 79.0741 14.1034 78.9227 12.5661C78.6266 9.47594 77.2888 6.57325 75.1237 4.32286C72.9585 2.07246 70.0911 0.604528 66.9808 0.154116C66.0492 0.0241137 14.0286 -0.0668881 12.7021 0.0631145ZM36.5235 20.051C38.8507 22.3488 40.7532 24.2728 40.7532 24.3248C40.7532 24.4028 38.877 24.4223 31.5696 24.4223C21.3459 24.4223 21.8594 24.3963 20.7534 24.9424C16.9845 26.8274 16.8857 32.0925 20.5822 34.0425C21.7014 34.6275 21.4545 34.608 26.2602 34.6665C30.8817 34.725 31.1154 34.7413 32.7645 35.1638C37.6854 36.4248 41.6123 40.4939 42.6887 45.447C43.0953 47.2901 43.1107 49.1964 42.7339 51.0456C42.357 52.8949 41.596 54.6469 40.499 56.1912C39.402 57.7355 37.9927 59.0386 36.36 60.0181C34.7274 60.9977 32.9069 61.6325 31.0133 61.8826C29.8711 62.0321 9.27223 62.0451 9.27223 61.8956C9.27223 61.8436 11.1583 59.939 13.4625 57.664L17.6461 53.5267L23.8014 53.4942C30.615 53.4649 30.2859 53.4877 31.4577 52.9352C32.206 52.5824 32.8571 52.0565 33.3557 51.4023C33.8542 50.748 34.1856 49.9847 34.3216 49.177C34.4576 48.3693 34.3943 47.5412 34.1369 46.7628C33.8796 45.9845 33.4359 45.2789 32.8435 44.706C31.4248 43.3085 30.964 43.2077 26.0957 43.2045C20.1642 43.2045 18.3143 42.7982 15.388 40.8612C5.25647 34.1465 8.3045 18.6405 20.2432 16.1704C21.494 15.9104 21.9614 15.8909 27.1885 15.8812L32.2938 15.8714L36.5202 20.0478M69.6568 15.9657C69.6568 16.0209 67.7543 17.9417 65.4304 20.2395L61.204 24.4191H46.632L42.3661 20.2005C40.9248 18.7949 39.5027 17.3701 38.1002 15.9267C38.1002 15.8942 45.2002 15.8682 53.8769 15.8682C66.4278 15.8682 69.6568 15.8877 69.6568 15.9657ZM61.2237 38.9111L61.204 43.1622H46.5596L46.451 42.8567C45.345 39.7951 44.1633 37.8939 42.0205 35.7261C41.6833 35.4028 41.3625 35.0633 41.0593 34.7088C41.0593 34.6763 45.6017 34.6568 51.1514 34.6568H61.2435L61.2237 38.9111ZM65.4304 57.6965C66.8585 59.0881 68.2674 60.4988 69.6568 61.9281C69.6568 61.9606 63.2217 61.9866 55.3581 61.9866C47.4944 61.9866 41.0593 61.9606 41.0593 61.9281C41.0593 61.8956 41.3984 61.5381 41.8098 61.1383C43.8784 59.1648 45.4363 56.7292 46.3522 54.0369L46.5267 53.5169H61.2007L65.4304 57.6965Z"
                fill="#1e3a8a"
              />
            </svg>
            <h2 className=" text-2xl md:text-4xl font-bold leading-9 tracking-tight text-gray-900 mt-6">
              Welcome back let Sign in
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

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="Username"
                  className="block text-sm font-medium leading-6 text-gray-900 md:text-2xl mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  ref={userRef}
                  placeholder="Username"
                  autoComplete="off"
                  pattern="[A-Za-z0-9]{1,20}"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  className="input-username"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 md:text-2xl "
                  >
                    Password
                  </label>
                  
                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setpwd(e.target.value)}
                  value={pwd}
                  className="input-password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm md:text-xl font-semibold
               leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
               focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500 md:text-base">
              Dont have account?
              <Link
                href="/sign_up"
                className="font-semibold leading-6 text-blue-900 hover:text-blue-600 md:text-base"
              >
                Try it
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sign_in;
