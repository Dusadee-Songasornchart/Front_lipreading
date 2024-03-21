import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { resolve } from "styled-jsx/css";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";

const Sign_up = () => {
  const [formData, setFormData] = useState("");
  let time = 1;
  const uploadFile = async (file) => {
    console.log("Uploading file...");

    const formData = new FormData();

    formData.append("file", file);
    formData.append("access_token", "kuy");
    setFormData(formData);
    const list = [{Email : "dusadee",Role:"user"},{Email : "Thoranin",Role:"Admin"}]
    
    const jsonData = JSON.stringify(list);
    formData.append("list",jsonData)
    console.log("file", file);
    console.log("formData", formData);

    await axios
      .post(process.env.NEXT_PUBLIC_LINKTEST + "/video/test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add any additional headers if needed
        },
        // params: { access_token: "kuy" }, // Add access_token as a query parameter
      })
      .then(function (response) {
        console.log(response);
      });
    // for (const entry of formData.entries()) {
    //   console.log(entry[0], entry[1]);
    // }
  };
  useEffect(() => {
    const fileInput = document.querySelector("#fileInput");
    fileInput.addEventListener("change", (event) => {
      const files = event.target.files;
      // console.log(files[0]);
      // const reader = new FileReader();
      // const data = reader.readAsDataURL(files[0]);
      // console.log(data);
      if (time === 1) {
        uploadFile(files[0]);
        time--;
      }
    });
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
      {/* <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 font-Poppins ">
          <div className="flex flex-col grid justify-items-center ">
            <img
              className="h-10 w-10 md:h-[5rem] md:w-[5rem] justify-center"
              src="w_symbol_2.svg"
              alt="SVG Image"
            />
            <h2 className=" text-2xl md:text-4xl font-bold leading-9 tracking-tight text-gray-900 mt-6">
              Welcome to LipSense
            </h2>
            <div className="flex mt-3">
              {errMsg ? (
                <p
                  ref={errRef}
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
                </div>
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
      </div> */}

      <h1>File Upload & FormData Example</h1>
      <div>
        <input type="file" id="fileInput" />
      </div>
      <p>{process.env.NEXT_PUBLIC_LINKTEST + "/video/test"}</p>
      <p>here</p>

    </div>
  );
};
export default Sign_up;
