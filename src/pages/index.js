import Navbar from "@/components/Navbar";
import Btn_red_home from "@/components/Btn_red_home";
import autoprefixer from "autoprefixer";
import Head from "next/head";
import { useAmp } from "next/amp";
import { useAuth } from "@/context/AuthContext";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Index() {
  const { token } = useAuth();
  console.log(token)
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
  useEffect(() => {
    if (token !== "null" && token !== null) {
      //toHome();
      // toWebAdmin();
      axios.post(process.env.NEXT_PUBLIC_LINKTEST + "/web-admin/check-web-admin", {
        access_token: token
      }).then(function (response) {
        console.log(response)
        if (response.data === "200 OK User") {
          toHome();
        } else if (response.data === "200 OK WebAdmin") {
          toWebAdmin();
        }
      })

    }
    // console.log("Token :", token);
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

      <div className="flex flex-col mt-[4.5rem]">
        <div>
          <Navbar />
        </div>
        <div className="bg-cover bg-center bg">
          <div className="flex items-center md:items-center lg:items-end relative w-full flex flex-col ">
            <div className="text-3xl md:text-4xl lg:text-5xl py-9 p-4 text-blue-900 font-Poppins font-bold z-[-2]">
              Make Your Subtitle with
              <span className="inline md:flex justify-center lg:justify-end text-3xl md:text-4xl lg:text-5xl py-3 text-red-700 z-[-2] ">
                {" "}
                Our LipSense
              </span>
            </div>
          </div>
          <div className="flex  md:flex lg:flex-start flex-col ">
        

            {/* <img className="rounded-2xl md:mr-8" src="demo_t.gif" alt="Description of your GIF"/> */}

            <div className="flex flex-col">
              <div className="text-3xl md:text-4xl lg:text-5xl p-4 text-blue-900 font-Poppins font-bold py-9 px-10 lg:justify-start">
                Do you{" "}
                <span className="text-red-700">
                  wanna try ?
                </span>
              </div>
              <div className="flex justify-center md:justify-center lg:justify-start">
                <Btn_red_home>Try it For Free</Btn_red_home>
              </div>
            </div>
          </div>

        </div>
        <div className="bg-gradient-to-b from-blue-900 to-blue-500  flex flex-col mt-14 ">
          <div className="text-3xl md:text-4xl lg:text-5xl  text-white font-Poppins font-bold mb-2 px-10 lg:justify mt-10">
            Explain why <span className="text-red-500">use</span>
          </div>
          <div
            className="leading-relaxed md:leading-relaxed lg:leading-relaxed whitespace-break-spaces text-left text-lg 
          md:text-xl lg:text-3xl  px-11 text-white font-Poppins mb-[3rem]  py-5"
          >
            {"              "}Welcome to Lipsense, a website for creating
            subtitles by lip reading. Our website works by reading your lips to
            create subtitles for your videos. , you can create your own
            subtitles and save them. You can also share your subtitles with your
            team so that they can access them. In your posts, your subtitles
            will be displayed and will change according to the time of the
            video. If you are interested, please sign up with us!
          </div>
          <div className="flex justify-center text-white mb-10 border-t-2 p-5 ml-5 mr-5">
            <div className="grid justify-items-center w-[20rem] mt-5">
              <svg
                width="77"
                height="69"
                viewBox="0 0 42 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="px-3  rounded-md bg-slate-200"
              >
                <path
                  d="M37.6667 0.333374H4.33341C2.04175 0.333374 0.187581 2.20837 0.187581 4.50004L0.166748 29.5C0.166748 31.7917 2.04175 33.6667 4.33341 33.6667H37.6667C39.9584 33.6667 41.8334 31.7917 41.8334 29.5V4.50004C41.8334 2.20837 39.9584 0.333374 37.6667 0.333374ZM37.6667 8.66671L21.0001 19.0834L4.33341 8.66671V4.50004L21.0001 14.9167L37.6667 4.50004V8.66671Z"
                  fill="#1e3a8a"
                />
              </svg>

              <div className="text-lg md:text-xl lg:text-2xl font-bold py-3 text-blue-900">
                Email us:
              </div>

              <div className="text-center font-bold text-xl mt-2 text-slate-100">
                Duxxxxxxxxxx@gmail.com
              </div>
            </div>
            <div className="grid justify-items-center w-[20rem] mt-5 ml-5">
              <svg
                width="77"
                height="69"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="p-4 rounded-md bg-slate-200"

              >
                <path
                  d="M37.7499 26.2083L26.7708 24.9375L21.5208 30.1875C15.6066 27.1796 10.7995 22.3725 7.79159 16.4583L13.0624 11.1875L11.7916 0.25H0.312419C-0.895914 21.4583 16.5416 38.8958 37.7499 37.6875V26.2083Z"
                  fill="#1e3a8a"
                />
              </svg>

              <div className="text-lg md:text-xl lg:text-2xl font-bold py-3 text-blue-900">
                Contact us:
              </div>

              <div className="text-center font-bold text-xl mt-2 text-slate-100">
                xxxxxxx-xxx
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
