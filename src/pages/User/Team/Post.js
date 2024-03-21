import Loading from "@/components/Loading";
import User_Navbar from "@/components/User_Navbar";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { markAssetError } from "next/dist/client/route-loader";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import ReactPlayer from "react-player";

const Post = () => {
  const { token } = useAuth();
  let time = 1;

  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(0);
  const [video_id,setVideo_Id] = useState("");
  const [highlightColor, setHighlightColor] = useState("bg-red-200");
  const [subtitleEng, setSubtitleEng] = useState([]);
  const [subtitleTH, setSubtitleTH] = useState([]);
  const [showEng, setShowEng] = useState(true);
  const [showTH, setShowTH] = useState(false);
  const [post, setPost] = useState([]);
  const [showDeletePost, setShowDeletePost] = useState(false);
  const [showDeletePostPage, setShowDeltePostPage] = useState(false);
  const { team_id, post_id } = router.query;
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(team_id,post_id)
  const Hilight_Color = [
    { bg: "bg-red-200", outline: "outline-red-700" },
    { bg: "bg-orange-200", outline: "outline-orange-700" },
    { bg: "bg-amber-200", outline: "outline-amber-700" },
    { bg: "bg-green-200", outline: "outline-green-700" },
    { bg: "bg-cyan-200", outline: "outline-cyan-700" },
    { bg: "bg-violet-200", outline: "outline-violet-700" },
    { bg: "bg-pink-200", outline: "outline-pink-700" },
  ];

  const defaultValues = {
    post: post,
  };
  const convertTimeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const getNameVideo = (fullPath) => {
    const sreWord = fullPath.split('_')
    console.log(sreWord)
    const name = sreWord.shift();

    return `${name}`;
  };

  const download_video_emb = async (video_id) => {
    // console.log(video_id);
    try {
      //waiting API
      const api =
        process.env.NEXT_PUBLIC_LINKTEST + "/video/new_download_video";
      // console.log(api);
      //waiting ton to decide  response
      const response = await axios.post(api, {
        access_token: token,
        video_id: video_id,
      });
      // console.log(response);
      if (response.status === 201) {
        console.log(response);
        const filePath = extractImagePath(response.data.merge_path);
        const nameVideo = getNameVideo(response.data.merge_path);
        // console.log(filePath, nameVideo);
        fetch(filePath)
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = nameVideo;
          link.style.fontFamily = "Poppins";
          link.click();
         
        })
        .catch(console.error)
       
      } else {
        setErrMsg("ERROR");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const download_subtitle = async (video_id) => {
    try {
      console.log(video_id);
      //waiting API
      const api =
        process.env.NEXT_PUBLIC_LINKTEST + "/video/new_download_subtitle";
      // console.log(api);
      //waiting ton to decide  response
      const response = await axios.post(api, {
        access_token: token,
        video_id: video_id,
      });
      console.log(response);
      if (response.status === 201) {
        //waiting for ton parameter
        console.log(response);
        const filePath = extractsubtitlePath(response.data.sub_path);
        const nameVideo = getNameVideo(response.data.sub_path);
        console.log(filePath, nameVideo);

        const link = document.createElement("a");
        link.href = filePath;

        
        link.download = nameVideo; 

        
        document.body.appendChild(link);

        
        link.click();

        
        document.body.removeChild(link);
      } else {
        setErrMsg("ERROR");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const extractImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_MERGE_VIDEO+fullPath
    // console.log(newPath)
    return newPath;
  };


  const extractOriginPath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_ORIGIN_VIDEO+fullPath
    // console.log(newPath)
    return newPath;
  };

  const extractsubtitlePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_SUBTITLE+fullPath
    // console.log(newPath)
    return newPath;
  };

  const sendToken = async () => {
    setLoading(true)
    // console.log(team_id, post_id);

    // const test_data_2 = {
    //   user_id: "1",
    //   team_id: "1",
    //   Role: "Admin",
    //   Post_id: "1",
    //   post_user: "Jimmy phongpracha",
    //   Post_date: " 4 JULY 2023 ",
    //   Post_video: "video",
    //   Subtitle_eng: [
    //     {
    //       start: "00:00:12.000",
    //       end: "00:00:15.000",
    //       message: "WHEN I WAS TWENTY SEVEN YEARS OLD",
    //     },
    //     {
    //       start: "00:00:15.000",
    //       end: "00:00:18.000",
    //       message: "I LEFT A VERY DEMANDING JOB IN MANAGEMENT CONSULTING",
    //     },
    //     {
    //       start: "00:00:18.000",
    //       end: "00:00:21.000",
    //       message: "FOR A JOB THAT WAS EVEN MORE DEMANDING",
    //     },
    //     {
    //       start: "00:00:21.000",
    //       end: "00:00:24.000",
    //       message: "TEACHING I WENT TO TEACH",
    //     },
    //     {
    //       start: "00:00:24.000",
    //       end: "00:00:27.000",
    //       message: "SEVENTH GRADERS MATH IN THE NEW YORK CITY",
    //     },
    //     {
    //       start: "00:00:27.000",
    //       end: "00:00:30.000",
    //       message: "SCHOOLS AND LIKE ANY",
    //     },
    //     {
    //       start: "00:00:30.000",
    //       end: "00:00:33.000",
    //       message: "QUIZZES AND TESTS I GAVE OUT HOMEWORK ASSIGNMENTS",
    //     },
    //     {
    //       start: "00:00:33.000",
    //       end: "00:00:36.000",
    //       message: "WHEN THE WORK CAME BACK I CALCULATED GRADES",
    //     },
    //     {
    //       start: "00:00:36.000",
    //       end: "00:00:39.000",
    //       message: "WHAT STRUCK ME WAS THAT I",
    //     },
    //     {
    //       start: "00:00:39.000",
    //       end: "00:00:42.000",
    //       message: "Q WAS NOT THE ONLY DIFFERENCE BETWEEN",
    //     },
    //   ],
    //   Subtitle_thai: [
    //     {
    //       start: "00:00:12.000",
    //       end: "00:00:15.000",
    //       message: "ตอนที่ผมอายุยี่สิบเจ็ดปี",
    //     },
    //     {
    //       start: "00:00:15.000",
    //       end: "00:00:18.000",
    //       message: "ฉันออกจากงานที่ต้องใช้ความพยายามอย่างมากในการให้คำปรึกษาด้านการจัดการ",
    //     },
    //     {
    //       start: "00:00:18.000",
    //       end: "00:00:21.000",
    //       message: "สำหรับงานที่มีความต้องการมากยิ่งขึ้น",
    //     },
    //     {
    //       start: "00:00:21.000",
    //       end: "00:00:24.000",
    //       message: "การสอนที่ฉันไปสอน",
    //     },
    //     {
    //       start: "00:00:24.000",
    //       end: "00:00:27.000",
    //       message: "คณิตศาสตร์สำหรับนักเรียนชั้นประถมศึกษาปีที่ 7 ในนิวยอร์กซิตี้",
    //     },
    //     {
    //       start: "00:00:27.000",
    //       end: "00:00:30.000",
    //       message: "โรงเรียนและอื่นๆ",
    //     },
    //     {
    //       start: "00:00:30.000",
    //       end: "00:00:33.000",
    //       message: "แบบทดสอบและแบบทดสอบที่ฉันแจกการบ้าน",
    //     },
    //     {
    //       start: "00:00:33.000",
    //       end: "00:00:36.000",
    //       message: "เมื่องานกลับมาฉันคำนวณผลการเรียน",
    //     },
    //     {
    //       start: "00:00:36.000",
    //       end: "00:00:39.000",
    //       message: "สิ่งที่ทำให้ฉันประทับใจก็คือฉัน",
    //     },
    //     {
    //       start: "00:00:39.000",
    //       end: "00:00:42.000",
    //       message: "Q ไม่ใช่ความแตกต่างเพียงอย่างเดียวระหว่าง",
    //     },
    //   ],
    // };

    // setPost(test_data_2);
    // setSubtitleEng(test_data_2.Subtitle_eng);
    // setSubtitleTH(test_data_2.Subtitle_thai);
    //check token iden
    //test online
    // setVideo("http://161.246.5.159:7778/files/origin_video/VideoProcess_16a941331035a29253ae91ad2baff10234.mp4");
    let test_data = {
      user_id: "1",
      team_id: "1",
      // ... other properties
    };

    // console.log(token, post_id, team_id);
    //online
    if (team_id !== undefined) {
      // console.log("team");
      await axios
        .post(process.env.NEXT_PUBLIC_LINKTEST + "/team-post-page", {
          access_token: token,
          post_id: post_id,
          team_id: team_id,
        })
        .then(function (response) {
          console.log("Post",response);
          if (response.data.status === "200 OK") {
            //wait ton
            setVideo(extractOriginPath(response.data.video_path))
            setPost(response.data);
            setSubtitleEng(response.data.subtitle_eng);
            setSubtitleTH(response.data.subtitle_thai);
            // console.log("re", response.data.subtitle_eng);
            setVideo_Id(response.data.video_id)
            const subtitleEngData = response.data.subtitle_eng;
            const subtitleThData = response.data.subtitle_thai;
            // console.log("res", subtitleEngData);

            // Move the test_datng = subtitleEngData;
            test_data.Subtitle_eng = subtitleEngData
            test_data.Subtitle_thai = subtitleThData;
            // console.log(test_data);
            // console.log("Subtitle_eng:", test_data.Subtitle_eng);
            // console.log("Subtitle_th:", test_data.Subtitle_thai);
          } else {
            setErrMsg("ERRORc");
          }
        });
      // console.log(test_data.Subtitle_eng);
    }
    return {
      Subtitle_eng: test_data.Subtitle_eng,
      Subtitle_thai: test_data.Subtitle_thai,
    };
  };

  const delPost = async (post_id) => {
    // console.log(post.team_id, post_id);
    
    console.log(post_id,team_id)
    axios
      //wait ton
      .post(process.env.NEXT_PUBLIC_LINKTEST + "/post/delete", {
        access_token: token,
        team_id: team_id,
        post_id: post_id,
      })
      .then(function (response) {
        // console.log(response);
        if (response.data === "200 OK") {
          //wait ton
          toTeampage(team_id);
        } else {
          //dev page add
          // console.log("somehow wrong");
        }
      });
  };

  function makeVTTEng(array){
    // console.log("array", array);
    const text = array.reduce((str, { start, end, text }, index) => {
      // you would also have to make a "seconds to timestamp" parser
      // but I leave it to the reader as an exercise
      const starts = start.replace(/,/g, '.');
      const ends = end.replace(/,/g, '.');
      return (
        str +
        `
  ${starts} --> ${ends}
  ${text}`
      );
    }, `WEBVTT`);
    console.log(text);
    return new Blob([text], { type: "text/plain" });
  }
  function makeVTTTH(array) {
    // console.log("array", array);
    const text = array.reduce((str, { start, end, message }, index) => {
      // you would also have to make a "seconds to timestamp" parser
      // but I leave it to the reader as an exercise
      const starts = start.replace(/,/g, '.');
      const ends = end.replace(/,/g, '.');
      return (
        str +
        `
  ${starts} --> ${ends}
  ${message}`
      );
    }, `WEBVTT`);
    console.log(text);
    return new Blob([text], { type: "text/plain" });
  }
  const handleSubtitleColor = (start, end) => {
    if (currentTime >= start && currentTime <= end) {
      return highlightColor;
    }
    return "";
  };
  const handleSubtitleClick = (start) => {
    const vid = document.querySelector("video");
    vid.currentTime = convertTimeToSeconds(start);
  };
  const handleUpdateColor = (color) => {
    setHighlightColor(color);
    // console.log(color);
  };
  const handleSelectSub = (event) => {
    if (event.target.value === "English") {
      setShowEng(true);
      setShowTH(false);
    } else if (event.target.value === "Thai") {
      setShowEng(false);
      setShowTH(true);
    }
  };
  const handleDelpost = () => {
    console.log("ok", showDeletePost);
    setShowDeletePost(!showDeletePost);
  };
  const handleShowDel = () => {
    setShowDeltePostPage(!showDeletePostPage);
  };

  const handleConfirmDelPost = (Post_id) => {
    delPost(Post_id);
  };

  const handleDownloadSubtitle = () => {
    download_subtitle(video_id);
  };
  const handleDownloadVideoEmbed = () => {
    download_video_emb(video_id);
  };

  const toTeampage = useCallback(
    (team_id) => {
      router.push({
        pathname: "/User/Team",
        query: { team_id: team_id },
      });
    },
    [router]
  );

  const formattedDate = (timestamp) => {
    const date = new Date(timestamp);

    // Format date as "YYYY-MM-DD"
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };
  const extractUserImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_USER_IMAGE + fullPath
    // console.log(newPath)
    return newPath;
  };

  useEffect(() => {
    localStorage.setItem("token", token);
    document.body.style.backgroundColor = "#cbd5e1";
    if (token === "null") {
      router.push({
        pathname: "/",
      });
    }

    const fetchData = async () => {
      const subtitleData = await sendToken();
       await console.log(subtitleData.Subtitle_eng, "subtitleEng");
       await console.log(subtitleData.Subtitle_thai, "subtitleTH");

      const VTTFile_EN =  await makeVTTEng(subtitleData.Subtitle_eng);
      const VTTFile_TH =  await makeVTTTH(subtitleData.Subtitle_thai);

      const vid = document.querySelector("video");
      console.log(vid)

      const trackEng = document.createElement("track");
      trackEng.kind = "subtitles";
      trackEng.label = "English";
      trackEng.srclang = "en";
      trackEng.src = URL.createObjectURL(VTTFile_EN);

      const trackTH = document.createElement("track");
      trackTH.kind = "captions";
      trackTH.label = "Thai";
      trackTH.srclang = "th";
      trackTH.src = URL.createObjectURL(VTTFile_TH);

      vid.addEventListener("loadedmetadata", (evt) => {
        trackEng.mode = showEng ? "showing" : "hidden";
        trackTH.mode = showTH ? "showing" : "hidden";
        vid.textTracks[0].mode = showEng ? "showing" : "hidden";
      });

      // console.log(vid);
      console.log(trackEng,trackTH)
      vid.append(trackEng);
      vid.append(trackTH);
        
      setLoading(false)
    };

    if (team_id !== undefined && post_id !== undefined) {
      fetchData();
    }

    const vid = document.querySelector("video");
    const handleTimeUpdate = (e) => {
      setCurrentTime(e.target.currentTime);
    };
    vid.addEventListener("timeupdate", handleTimeUpdate);
    time--;
    return () => vid.removeEventListener("timeupdate", handleTimeUpdate);
  }, [team_id]);

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
        <User_Navbar />
        {loading && <Loading />}
        <div className="py-10 md:px-10 mt-16 font-Poppins">
          <div className="p-4 border-2 ml-4 md:mr-4 border-blue-900 bg-white rounded-md">
            <div className="flex justify-between">
              <div className="flex flex-rows">
              <img className="h-10 w-10 mt-[0.35rem] rounded-full" src={extractUserImagePath(post.user_image)} alt="" />

                <div className="ml-7 ">
                  <div className="text-xl font-bold">{post.post_user}</div>
                  <div className="mt-1 text-slate-400">
                    {/* {new Date(post.post_date).toISOString().split("T")[0]} */}
                    {formattedDate(post.post_date)}

                  </div>
                </div>
              </div>
              <div>
                <button className="mr-5" onClick={() => handleDelpost()}>
                  <svg
                    width="30"
                    height="10"
                    viewBox="0 0 42 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.39159 9.6875C4.14619 9.6875 2.9518 9.19364 2.07117 8.31456C1.19053 7.43549 0.695801 6.2432 0.695801 5C0.695801 3.7568 1.19053 2.56451 2.07117 1.68544C2.9518 0.80636 4.14619 0.3125 5.39159 0.3125C6.63699 0.3125 7.83139 0.80636 8.71202 1.68544C9.59265 2.56451 10.0874 3.7568 10.0874 5C10.0874 6.2432 9.59265 7.43549 8.71202 8.31456C7.83139 9.19364 6.63699 9.6875 5.39159 9.6875ZM21.0442 9.6875C19.7988 9.6875 18.6044 9.19364 17.7238 8.31456C16.8432 7.43549 16.3484 6.2432 16.3484 5C16.3484 3.7568 16.8432 2.56451 17.7238 1.68544C18.6044 0.80636 19.7988 0.3125 21.0442 0.3125C22.2896 0.3125 23.484 0.80636 24.3647 1.68544C25.2453 2.56451 25.74 3.7568 25.74 5C25.74 6.2432 25.2453 7.43549 24.3647 8.31456C23.484 9.19364 22.2896 9.6875 21.0442 9.6875ZM36.6969 9.6875C35.4515 9.6875 34.2571 9.19364 33.3764 8.31456C32.4958 7.43549 32.0011 6.2432 32.0011 5C32.0011 3.7568 32.4958 2.56451 33.3764 1.68544C34.2571 0.80636 35.4515 0.3125 36.6969 0.3125C37.9423 0.3125 39.1367 0.80636 40.0173 1.68544C40.8979 2.56451 41.3927 3.7568 41.3927 5C41.3927 6.2432 40.8979 7.43549 40.0173 8.31456C39.1367 9.19364 37.9423 9.6875 36.6969 9.6875Z"
                      fill="#060640"
                    />
                  </svg>
                </button>
                {showDeletePost && (
                  <div>
                    {post.role === "Owner" || post.role === "Admin" ? (
                      <div className="right-5 absolute z-20 ">
                        <div className=" flex-auto overflow-hidden rounded-3xl bg-white text-sm  shadow-lg ring-1 ring-gray-900/5">
                          <div className="group relative flex  rounded-lg p-4 ">
                            <div>
                              <div>
                                <button
                                  className="relative py-2 font-semibold text-red-600 text-lg "
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShowDel();
                                  }}
                                >
                                  Delete Post
                                </button>
                                {showDeletePostPage && (
                                  <div
                                    className=" z-50 "
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 "></div>

                                    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
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
                                              Delete this Post also removes
                                              Post, and their resources.
                                              <span className="font-bold text-red-600">
                                                Removed Post can not be
                                                restored!
                                              </span>
                                            </div>

                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                              <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 sm:ml-3 sm:w-auto"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleConfirmDelPost(
                                                    post.post_id
                                                  );
                                                }}
                                              >
                                                Confirm Delete
                                              </button>
                                              <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-blue-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  hover:text-white sm:mt-0 sm:w-auto"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleShowDel();
                                                  handleDelpost();
                                                }}
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
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 text-xl md:ml-[4.5rem] mb-4">{post.post_description}</div>
            <div className="grid">
              <div className="justify-self-center	 max-w-[50rem] max-h-[40rem] rounded-xl">
                <video controls src={video}></video>
              </div>
            </div>
          </div>
          <div className="p-4 border-2 ml-4 md:mr-4 mt-4 border-blue-900 bg-white rounded-md">
            <div className="flex items-center md:justify-between md:border-b-2 md:py-4 border-blue-100">
              <div className="text-2xl ml-2 font-bold text-blue-900">
                Subtitle
              </div>
              <div className="invisible w-0 h-0 md:visible md:w-auto md:h-auto flex items-center flex-rows ">
                <ul>
                  {Hilight_Color.map((color, index) => (
                    <span key={index}>
                      <button
                        className={`duration-70 hover:scale-110  ${
                          color.bg
                        } w-7 h-7 rounded-md ${
                          highlightColor === color.bg &&
                          `outline outline-2 outline-offset-2 ${color.outline}`
                        }  mr-3 mt-2`}
                        onClick={() => handleUpdateColor(color.bg)}
                      ></button>
                    </span>
                  ))}
                </ul>

                <div>
                  <select
                    id="invite-members-dropdown"
                    className="gl-form-select custom-select input-input-signup"
                    onChange={handleSelectSub}
                  >
                    <option value="English">English</option>
                    <option value="Thai">Thai</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="visible md:invisible md:w-0 md:h-0 mb-2 border-b-2 border-blue-100 py-2">
                <ul>
                  {Hilight_Color.map((color, index) => (
                    <span key={index}>
                      <button
                        className={`duration-70 hover:scale-110  ${
                          color.bg
                        } w-7 h-7 rounded-md ${
                          highlightColor === color.bg &&
                          `outline outline-2 outline-offset-2 ${color.outline}`
                        }  mr-3 mt-2`}
                        onClick={() => handleUpdateColor(color.bg)}
                      ></button>
                    </span>
                  ))}
                </ul>

                <div>
                  <select
                    id="invite-members-dropdown"
                    className="gl-form-select custom-select input-input-signup mt-2 mb-3"
                    onChange={handleSelectSub}
                  >
                    <option value="English">English</option>
                    <option value="Thai">Thai</option>
                  </select>
                </div>
              </div>
            {showEng && (
              <ul className="px-2 py-2 md:px-16 md:py-5 h-[10rem] overflow-y-auto">
                {subtitleEng.map((subtitle, index) => (
                  <span
                    key={index}
                    className={`text-xl cursor-pointer ${handleSubtitleColor(
                      convertTimeToSeconds(subtitle.start),
                      convertTimeToSeconds(subtitle.end)
                    )}`}
                    onClick={() => handleSubtitleClick(subtitle.start)}
                  >
                    {subtitle.text}
                    {index < subtitleEng.length - 1 && ","}
                  </span>
                ))}
              </ul>
            )}
            {showTH && (
              <ul className="px-2 py-2 md:px-16 md:py-10 h-[10rem] overflow-y-auto">
                {subtitleTH.map((subtitle, index) => (
                  <span
                    key={index}
                    className={`text-xl cursor-pointer ${handleSubtitleColor(
                      convertTimeToSeconds(subtitle.start),
                      convertTimeToSeconds(subtitle.end)
                    )}`}
                    onClick={() => handleSubtitleClick(subtitle.start)}
                  >
                    {subtitle.message}
                    {index < subtitleEng.length - 1 && ","}
                  </span>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-4 border-2 ml-4 md:mr-4 mt-4 border-blue-900 bg-white rounded-md">
            <div className="flex justify-between py-4">
              <div className="flex items-center text-2xl ml-2 font-bold text-blue-900">
                Download
              </div>
              <div className="mt-5 md:mt-0 flex items-center ">
                <button
                  className="duration-100 hover:scale-105 hover:bg-cyan-50 flex flex-rows p-3 border-2 ml-2 md:ml-4 border-blue-900 bg-white rounded-md"
                  onClick={handleDownloadVideoEmbed}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:mr-3"
                  >
                    <path
                      d="M18.5 0C8.28276 0 0 8.28276 0 18.5C0 28.7172 8.28276 37 18.5 37C28.7172 37 37 28.7172 37 18.5C37 8.28276 28.7172 0 18.5 0ZM18.5 32.9783C10.5028 32.9783 4.02175 26.4952 4.02175 18.5C4.02175 10.5048 10.5028 4.02175 18.5 4.02175C26.4972 4.02175 32.9783 10.5048 32.9783 18.5C32.9783 26.4952 26.4972 32.9783 18.5 32.9783ZM22.1196 10.7582H14.8804V18.9826H10.356L18.5 26.644L26.644 18.9826H22.1196L22.1196 10.7582Z"
                      fill="#1E3A8A"
                    />
                  </svg>
                  <div className="invisible md:visible w-0 h-0 md:w-auto md:h-auto">
                  Download Video embed Subtitle
                  </div>
                </button>
                <button
                  className="duration-100 hover:scale-105 hover:bg-cyan-50 flex flex-rows p-3 border-2 ml-4 mr-4  border-blue-900 bg-white rounded-md"
                  onClick={handleDownloadSubtitle}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 44 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:mr-3"
                  >
                    <path
                      d="M39.6 0C40.767 0 41.8861 0.487275 42.7113 1.35463C43.5364 2.22199 44 3.39837 44 4.625V32.375C44 33.6016 43.5364 34.778 42.7113 35.6454C41.8861 36.5127 40.767 37 39.6 37H4.4C3.23305 37 2.11389 36.5127 1.28873 35.6454C0.46357 34.778 0 33.6016 0 32.375V4.625C0 3.39837 0.46357 2.22199 1.28873 1.35463C2.11389 0.487275 3.23305 0 4.4 0H39.6ZM39.6 32.375V4.625H4.4V32.375H39.6ZM8.8 13.875H13.2V18.5H8.8V13.875ZM8.8 23.125H26.4V27.75H8.8V23.125ZM30.8 23.125H35.2V27.75H30.8V23.125ZM17.6 13.875H35.2V18.5H17.6V13.875Z"
                      fill="#1E3A8A"
                    />
                  </svg>
                  <div className="invisible md:visible w-0 h-0 md:w-auto md:h-auto">
                  Download Subtitle
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
