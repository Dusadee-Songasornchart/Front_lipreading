import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";


import axios from "axios";
import Loading from "./Loading";

const U_guest = () => {
  const errRef = useRef();
  const UploadRef = useRef();
  const [video, setVideo] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toDownload = useCallback(
    (name) => {
      router.push({
        pathname: "Guest/download",
        query: { name },
      });
    },
    [router]
  );

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
    //Continue with the file reading if it's within the size limit

    setVideo(selectedVideo);
    setShowVideo(true);
  }

  const defaultValues = {
    Video_name: video.name,
    Video: video,
  };

  const Send_Video = async () => {
    try {
      const api = process.env.NEXT_PUBLIC_LINKTEST + "/video/upload";
      console.log(defaultValues.Video);
      const formData = new FormData();
      formData.append("file", defaultValues.Video);
      formData.append("video_name", defaultValues.Video_name);
      console.log(formData);
      setLoading(true);
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add any additional headers if needed
        },
      });
      await console.log("yeah", defaultValues.Video_name);
      console.log(response);
      if (response.request.status === 201) {
        setLoading(false);
        toDownload(response.data.video_id);
        // Handle success
      } 
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="flex ml-9 mt-3 ">
        {errMsg ? (
          <p
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
      <div className="flex justify-center items-center z-[-2] mt-4 md:mt-6">
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
            className="flex justify-center items-center flex-col w-[20rem] md:w-[40rem] lg:w-[60rem] h-[10rem] md:h-[20rem] lg:h-[30rem] 
      bg-clip-border p-6 bg-slate-200 border-4 border-blue-900 border-dashed rounded-[1rem]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.8}
              stroke="currentColor"
              className="w-[4rem] md:w-[8rem] lg:w-[12rem] h-[4rem] md:h-[8rem] lg:h-[12rem]  stroke-blue-900 fill-white "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
            <div className="font-Poppins text-blue-900 text-lg md:text-3xl lg:text-4xl font-bold">
              upload your video
            </div>
          </label>
        )}
        {showVideo && (
          <div>
            <div className="flex justify-center items-center h-[2rem] md:h-[4rem] lg:h-[6rem] z-[-2]">
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
                className="flex justify-between items-center w-[20rem] md:w-[40rem] lg:w-[60rem] h-[2rem] md:h-[3rem] lg:h-[4rem] 
      bg-clip-border p-6 bg-slate-200 border-2 border-blue-900 border-dashed rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={0.8}
                  stroke="currentColor"
                  className="w-[2rem] md:w-[3rem] lg:w-[3rem] h-[4rem] md:h-[3rem] lg:h-[3rem]  stroke-blue-900 fill-white "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
                <div className="font-Poppins text-blue-900 text-lg md:text-xl lg:text-2xl font-bold">
                  upload other video
                </div>
              </label>
            </div>
            <div className="flex justify-between mt-5 font-Poppins text-blue-900 text-lg md:text-xl lg:text-2xl font-bold">
              <div className="mt-6 overflow-hidden overflow-hidden whitespace-nowrap overflow-ellipsis">
                {video.name}
              </div>
              <div className="mt-4">
                <button
                  className="flex flex-row bg-blue-900 text-white font-[Poppins] py-2 px-4  rounded-md
                 md:ml-3 hover:bg-blue-700 text-lg md:text-xl lg:text-2xl font-Poppins  font-bold
                duration-500"
                  href="/Guest"
                  onClick={Send_Video}
                >
                  create Subtitle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <form id="videoForm" encType="multipart/form-data">
    <input type="file" id="videoInput" accept="video/*"/>
    <button type="button" onClick={handleTestVideo}>Upload Video</button>
  </form> */}
    </div>
  );
};

export default U_guest;
