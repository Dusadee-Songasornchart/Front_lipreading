import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { ChangeEvent } from "react"; // Import ChangeEvent type

import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";

const U_user = ({ user }) => {
  console.log(user);
  const { token } = useAuth();
  const errRef = useRef();
  const UploadRef = useRef();
  const [link_video, setLink_video] = useState("");
  const [video, setVideo] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading,setLoading] = useState(false);

  const router = useRouter();

  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);

  function handleFileChange(event) {
    event.preventDefault();
    const selectedVideo = event.target.files[0];

    // Check the file size before attempting to read it
    const maxFileSize = 300 * 1024 * 1024; // 50 MB
    if (selectedVideo.size > maxFileSize) {
      setErrMsg("File size exceeds the limit (300 MB).");
      console.error("File size exceeds the limit (300 MB).");
      return;
    } else {
      setErrMsg("");
    }

    console.log("file_video", selectedVideo);

    setVideo(selectedVideo);
    setShowVideo(true);
  }

  const defaultValues = {
    Video_name: video.name,
    Video: video,
  };

  const Send_Video = async () => {
    try {
      setLoading(true)
      const api = process.env.NEXT_PUBLIC_LINKTEST + "/video/upload";
      const formData = new FormData();
      formData.append("file", defaultValues.Video);
      formData.append("access_token",token)
      const response = await axios.post(api,formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add any additional headers if needed
        },
      });
      await console.log("yeah", defaultValues.Video_name);
      console.log(response);
      if (response.request.status === 201) {
        setLoading(false)
        toReloadPage();
        // Handle success
      } else {
        setErrMsg("Incorrect username or password");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
 {loading&&(
        <Loading/>
      )}
      <div className="flex ml-6 mb-4 ">
        {errMsg ? (
          <p
            id = "errMsgVideo"
            ref={errRef}
            className="flex item-center text-red-900 text-md md:text-2xl bg-red-500 rounded-md text-white px-5 py-1 font-bold mt-3"
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
      <div className="z-[-2] px-4 ">
        <input
          id="fileInput"
          ref={UploadRef}
          className="VideoInput_input hidden"
          type="file"
          onChange={handleFileChange}
          accept=".mov,.mp4"
        />
        {!showVideo && (
          <label
            htmlFor="fileInput"
            className="flex justify-start items-center flex-row bg-clip-border  p-2 md:p-6 bg-slate-200 border-2 border-blue-900 border-dashed rounded-[1rem]"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 84 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42 5.25C32.2897 5.36715 23.0101 9.27663 16.1434 16.1434C9.27663 23.0101 5.36715 32.2897 5.25 42C5.36715 51.7103 9.27663 60.9899 16.1434 67.8566C23.0101 74.7234 32.2897 78.6329 42 78.75C51.7103 78.6329 60.9899 74.7234 67.8566 67.8566C74.7234 60.9899 78.6329 51.7103 78.75 42C78.6329 32.2897 74.7234 23.0101 67.8566 16.1434C60.9899 9.27663 51.7103 5.36715 42 5.25ZM63 44.625H44.625V63H39.375V44.625H21V39.375H39.375V21H44.625V39.375H63V44.625Z"
                fill="#060640"
              />
            </svg>

            <div className="ml-4 text-blue-900 text-lg md:text-xl  font-bold">
              upload your video
            </div>
          </label>
        )}
        {showVideo && (
          <div>
            <div className="justify-start items-center h-[2rem] md:h-[4rem] lg:h-[6rem] z-[-2] ">
              <input
                id="fileInput"
                ref={UploadRef}
                className="VideoInput_input hidden"
                type="file"
                onChange={handleFileChange}
                accept="*"
              />
              <label
                htmlFor="fileInput"
                className="flex justify-between items-center  bg-clip-border p-2 md:p-3 bg-slate-200 border-2 border-blue-900 border-dashed rounded-md"
              >
                <svg
                  viewBox="0 0 84 84"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                >
                  <path
                    d="M42 5.25C32.2897 5.36715 23.0101 9.27663 16.1434 16.1434C9.27663 23.0101 5.36715 32.2897 5.25 42C5.36715 51.7103 9.27663 60.9899 16.1434 67.8566C23.0101 74.7234 32.2897 78.6329 42 78.75C51.7103 78.6329 60.9899 74.7234 67.8566 67.8566C74.7234 60.9899 78.6329 51.7103 78.75 42C78.6329 32.2897 74.7234 23.0101 67.8566 16.1434C60.9899 9.27663 51.7103 5.36715 42 5.25ZM63 44.625H44.625V63H39.375V44.625H21V39.375H39.375V21H44.625V39.375H63V44.625Z"
                    fill="#060640"
                  />
                </svg>
                <div className="font-Poppins text-blue-900 text-lg ml-[3rem] w-auto md:text-xl lg:text-2xl font-bold">
                  upload other video
                </div>
              </label>
            </div>
            <div className="flex justify-between mt-5 md:mt-0 font-Poppins text-blue-900 text-lg md:text-xl lg:text-2xl font-bold">
              <div className="mt-6 overflow-hidden overflow-hidden whitespace-nowrap overflow-ellipsis max-w-2">
                {video.name}
              </div>
              <div className="mt-4">
                <button
                  className="flex flex-row bg-blue-900 text-white  py-2 px-2 md:px-4  rounded-md
                 md:ml-3 hover:bg-blue-700 text-md md:text-xl lg:text-2xl font-Poppins  font-bold
                duration-500"
                  onClick={Send_Video}
                >
                  create Subtitle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default U_user;
