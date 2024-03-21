import Btn_download from "@/components/Btn_download";
import Navbar from "@/components/Navbar";
import U_guest from "@/components/U_guest";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const Download = () => {
  const router = useRouter();
  // const {name} = "test_video.mp4"
  const { name } = router.query;
  console.log(name);

  // const videoname = name.split('.');
  // const Video = videoname[0]
  const defaultValues = {
    Video_name: name,
  };

  function HandleDownload() {
    Download();
  }

  const extractsubtitlePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_SUBTITLE + fullPath
    console.log(newPath)
    return newPath;
  };

  const getNameVideo = (fullPath) => {
    const sreWord = fullPath.split('_')
    console.log(sreWord)
    const name = sreWord.shift() + "_subtitle";

    return `${name}`;
  };

  const Download = async () => {
    try {
      const api = process.env.NEXT_PUBLIC_LINKTEST + "/video/new_download_video";
      console.log(api);
      const response = await axios.post(api, {
        video_id: defaultValues.Video_name,
      });
      console.log(response);
      if (response.status === 201) {
        //waiting for ton parameter
        console.log(response);
        const filePath = extractsubtitlePath(response.data.merge_path);
        const nameVideo = getNameVideo(response.data.merge_path);
        console.log(filePath, nameVideo);

        fetch(filePath)
          .then(response => response.blob())
          .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);

            // Set the filename with the ".srt" extension
            link.download = nameVideo + ".srt";
            
            link.click();
            setTimeout(() => {
              toReloadPage()
              router.push({
                pathname: "/",
        
              });
            }, 3000);
          })
          .catch(console.error)
      } else {
        setErrMsg("ERROR");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);
  return (
    <div>
      <Head>
        <style>
          {`
           @import url("https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=Oswald:wght@500&family=Poppins&family=Raleway:wght@100;600;700&display=swap");
          `}
        </style>
      </Head>

      <div className="flex flex-col mt-[4.5rem]">
        <div>
          <Navbar />
        </div>
        <div className="flex justify-center text-2xl md:text-5xl lg:text-6xl font-Poppins font-bold text-blue-900 mt-14 z-[-2]">
          Your Subtitle has been&nbsp;
          <span className="text-red-500">create</span>
        </div>
        <div className="flex flex-row justify-center mt-12">
          <div className="flex justify-center invisible md:visible md:mb-5 ">
            <Link href="/Guest">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="md:w-[5rem] md:h-[5rem] stroke-white fill-blue-900 hover:fill-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </div>
          <button
            className="flex flex-row bg-red-700 text-white font-[Poppins] py-4 px-8  rounded-full
      md:ml-3 hover:bg-red-600 text-lg md:text-2xl lg:text-3xl font-Poppins  font-bold
      duration-500 h-[4.5rem] duration-100 hover:scale-105"
            onClick={HandleDownload}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 md:w-10  h-8  md:h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="mx-4 mt-1 text-md md:text-2xl">
              Download Your Subtitle
            </div>
          </button>
        </div>
        <div className="flex justify-center visible md:invisible mt-6">
          <Link href="/Guest">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 stroke-white fill-blue-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Download;
