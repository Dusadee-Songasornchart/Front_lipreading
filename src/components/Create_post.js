import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Loading from "./Loading";

const Create_post = (team_id) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [video, setVideo] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const { token } = useAuth();
  const [errMsg, setErrMsg] = useState("");

  const Team_id = team_id.team_id;
  const router = useRouter();

  console.log(video);
  const sendToken = async () => {
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/video/getVideoesUser";
    axios
      .post(api, {
        access_token: token,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "200 OK") {
          console.log(response.data);
          setVideo(response.data.video);
          setName(response.data.username)
          setProfile(extractUserImagePath(response.data.user_profile))
        } else {
          console.log("err");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const extractUserImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_USER_IMAGE + fullPath
    console.log(newPath)
    return newPath;
  };

  const createPost = async (postDescription, selectedVideo) => {
    //waiting api form ton
    setLoading(true);
    // console.log(token, Team_id, selectedVideo, postDescription);
    // if (selectedVideo !== "") {
    //   handleClick();
    // } else if (selectedVideo === "") {
    //   setErrMsg("please select video");
    // }
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/post/create";
    axios
      .post(api, {
        access_token: token,
        team_id: Team_id,
        video_id: selectedVideo,
        post_description: postDescription,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "200 OK") {
          setLoading(false);
          handleClick();
          toReloadPage();
        } else {
          console.log("err");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getNameVideo = (fullPath) => {
    const sreWord = fullPath.split('_')
    console.log(sreWord)
    const name = sreWord.shift();

    return `${name}`;
  };

  const handleClick = () => {
    setShowCreatePost(!showCreatePost);
    setSelectedVideo("");
    setPostDescription("");
  };
  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);
  const handleCreatePost = () => {
    createPost(postDescription, selectedVideo);
  };
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSelectedVideo(selectedValue);
  };

  let time = 1;
  useEffect(() => {
    console.log("ok");
    if (time === 1) {
      sendToken();
      time--;
    }
  }, [showCreatePost]);

  return (
    <div>
      {loading && <Loading />}
      <button
        id="CreatePost"
        className="flex w-full border-2 border-blue-900 rounded-md py-4 px-2"
        onClick={handleClick}
      >
        <img className="h-10 w-10 rounded-full" src={profile} alt="" />
        <div className="flex flex-rows  border-blue-700 border-2 border-dashed ml-6 mr-6 w-full rounded-lg">
          <svg
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="invisible w-0 h-0 md:visible md:w-10 md:h-10 mt-[0.36rem] ml-4 "
          >
            <path
              d="M42 5.25C32.2897 5.36715 23.0101 9.27663 16.1434 16.1434C9.27663 23.0101 5.36715 32.2897 5.25 42C5.36715 51.7103 9.27663 60.9899 16.1434 67.8566C23.0101 74.7234 32.2897 78.6329 42 78.75C51.7103 78.6329 60.9899 74.7234 67.8566 67.8566C74.7234 60.9899 78.6329 51.7103 78.75 42C78.6329 32.2897 74.7234 23.0101 67.8566 16.1434C60.9899 9.27663 51.7103 5.36715 42 5.25ZM63 44.625H44.625V63H39.375V44.625H21V39.375H39.375V21H44.625V39.375H63V44.625Z"
              fill="#1E3A8A"
            />
          </svg>
          <div className="py-3 text-xl ml-4">Create new Post</div>
        </div>
      </button>
      <div>
        {showCreatePost && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10  overflow-y-auto ">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4  sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          className="text-xl font-semibold leading-6 text-blue-900 mb-5 border-blue-200 border-b-2 py-2"
                          id="modal-title"
                        >
                          Create Post
                        </h3>
                        <div>
                          <div className="flex flex-rows">
                            <img className="h-10 w-10 rounded-full mt-[0.35rem]" src={profile} alt="" />

                            <div className="ml-7 ">
                              <div className="text-lg font-bold">{name}</div>
                            </div>
                          </div>

                          <div>
                            <select
                              id="invite-members-dropdown"
                              className="gl-form-select custom-select input-input-signup mt-3"
                              data-qa-selector="access_level_dropdown"
                              aria-describedby="__BVID__791__BV_description_"
                              onChange={handleDropdownChange}
                              value={selectedVideo}
                            >
                              {selectedVideo === "" && (
                                <option value="" disabled>
                                  Choose your video
                                </option>
                              )}
                              {video.map((videoItem) => (
                                <option
                                  key={videoItem.video_id}
                                  value={videoItem.video_id}
                                >
                                  {getNameVideo(videoItem.video_name)}
                                </option>
                              ))}
                            </select>
                            {errMsg ? (
                              <div className="mt-1 ml-2 text-red-600">
                                {errMsg}
                              </div>
                            ) : null}

                            <textarea
                              id="TeamDescription"
                              placeholder="Team Description"
                              onChange={(e) =>
                                setPostDescription(e.target.value)
                              }
                              value={postDescription}
                              className="input-input-signup mt-5"
                            />
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
                        handleCreatePost();
                      }}
                    >
                      Create Post
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto"
                      onClick={() => {
                        handleClick();
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
      </div>
    </div>
  );
};

export default Create_post;
