import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import CreateTeam from "../User/CreateTeam";
import Navbar_webadmin from "@/components/Navbar_webadmin";
import Sidebar_Webadmin from "@/components/Sidebar_webadmin";
import Loading from "@/components/Loading";

const User = () => {
  const router = useRouter();
  const [searchMember, setSearchMember] = useState("");
  const [showMemberSearch, setshowMemberSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const [loading,setLoading] = useState(false);

  const defaultValues = {
    users: users,
  };

  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);

  const sendToken = () => {
    setLoading(true)
    // const data = [
    //   {
    //     user_id: "1",
    //     username: "John",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "2",
    //     username: "Joh",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "3",
    //     username: "Jon",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "1",
    //     username: "John",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "2",
    //     username: "Joh",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "3",
    //     username: "Jon",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "1",
    //     username: "John",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "2",
    //     username: "Joh",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "3",
    //     username: "Jon",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "1",
    //     username: "John",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "2",
    //     username: "Joh",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    //   {
    //     user_id: "3",
    //     username: "Jon",
    //     Email: "dusadeesongasornchart@gmail.com",
    //     teams: "20",
    //     date: "20 May 2012",
    //     status: "online",
    //   },
    // ];
    // setUsers(data);
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/web-admin/user_getAllUserInfo";
    axios
      .post(api, {
        access_token: token,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "200 OK") {
          setLoading(false);
          setUsers(response.data.UserInfo)
          // wait me dev
        } else {
          // wait me dev
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const editmember = (user_id, status) => {
    console.log(user_id,status,"status")
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/web-admin/user_editUser";
    axios
      .post(api, {
        access_token: token,
        changed_user_id: user_id,
        status: status,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "200 OK") {

          toReloadPage();
          // wait me dev
        } else {
          // wait me dev
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    //toReloadPage();
  };

  const handleSearch = () => {
    const data = defaultValues.users;
    console.log(searchMember);
    if (searchMember !== "") {
      const filteredNames = data.filter(
        (name) =>
          name.username.toLowerCase().includes(searchMember.toLowerCase()) ||
          name.email.toLowerCase().includes(searchMember.toLowerCase())
      );
      setshowMemberSearch(filteredNames);
    } else setshowMemberSearch("");
  };

  const handleStatusChage = (user_id, status) => {
    console.log(user_id, status.target.value);
    editmember(user_id, status.target.value);
  };

  const formattedDate = (timestamp) => {
    const date = new Date(timestamp);

    // Format date as "YYYY-MM-DD"
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (token === "null" || token === null) {
      console.log("ok")
      router.push({
        pathname: "/",
      });
    }
    sendToken();
    document.body.style.backgroundColor = "white";
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
      <div className="invisible w-0 h-0 lg:visible lg:w-auto lg:h-auto">
        <Navbar_webadmin />
        <Sidebar_Webadmin />
        {loading && (
          <Loading/>
        )}
        <div className=" mt-[6.5rem] w-full">
          <div className="ml-[10rem] flex justify-between">
            <div className="text-blue-900 font-bold text-4xl mt-2">Users</div>
            <div>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="block w-[20rem] py-5 ps-2 text-sm text-gray-900 border border-blue-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search by Member name"
                  required
                  value={searchMember}
                  onChange={(e) => setSearchMember(e.target.value)}
                ></input>
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-[0.8rem] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSearch}
                >
                  <svg
                    className="w-5 h-5 text-white font-bold"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-between py-7 bg-sky-50 rounded-md text-gray-900 font-bold text-xl">
            <div className="flex flex-rows ">
              <div className="ml-[10rem]">Userid</div>
              <div className="ml-[5rem]">Username</div>
              <div className="ml-[10rem]">Email</div>
            </div>
            <div className="flex flex-rows">
              <div className="md:px-10">Teams</div>
              <div className=" px-0 md:px-10 ">Create_Date</div>
              <div className="px-10"> status</div>
            </div>
          </div>
          <div>
            {showMemberSearch ? (
              <div>
                {showMemberSearch.length !== 0 ? (
                  <ul className="ml-[8rem]  space-y-4  mt-4">
                    {showMemberSearch.map((user, index) => (
                      <li key={index}>
                        <div className=" static flex items-center justify-between w-auto py-4 border-b-2 ">
                          <div className="flex flex-row items-center">
                            <div className="ml-3 md:ml-[4rem] text-xl">
                              {user.user_id}
                            </div>
                            <div className="absolute left-[19rem]">{user.username}</div>
                        <div className="absolute left-[35rem]">{user.email}</div>
                          </div>
                          <div className="flex flex-row items-center">
                            <div className="mr-[8rem]">{user.teams}</div>
                            <div className="flex items-center w-0 md:w-auto mr-[5rem]">
                              {formattedDate(user.date)}
                            </div>
                            <div className="mr-5">
                              <select
                                id="invite-members-dropdown"
                                className="items-center  w-auto  bg-white rounded-md border-2 border-blue-900 py-2  px-2"
                                value={user.status}
                                onChange={(event) =>
                                  handleStatusChage(user.user_id, event)
                                }
                              >
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="grid justify-items-center ml-5 w-auto h-auto ">
                    <svg
                      width="150"
                      height="150"
                      viewBox="0 0 291 291"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-12"
                    >
                      <path
                        d="M102.125 98.525C104.54 98.4566 106.945 98.8733 109.197 99.7505C111.448 100.628 113.501 101.947 115.234 103.632C116.966 105.316 118.344 107.331 119.284 109.557C120.224 111.782 120.709 114.174 120.709 116.591C120.709 119.007 120.224 121.399 119.284 123.625C118.344 125.851 116.966 127.865 115.234 129.55C113.501 131.234 111.448 132.554 109.197 133.431C106.945 134.308 104.54 134.725 102.125 134.656C97.3318 134.656 92.7349 132.752 89.3455 129.363C85.9562 125.974 84.0521 121.377 84.0521 116.583C84.0521 111.79 85.9562 107.193 89.3455 103.804C92.7349 100.415 97.3318 98.5105 102.125 98.5105V98.525ZM188.875 98.525C191.29 98.4566 193.695 98.8733 195.947 99.7505C198.198 100.628 200.251 101.947 201.984 103.632C203.716 105.316 205.094 107.331 206.034 109.557C206.975 111.782 207.459 114.174 207.459 116.591C207.459 119.007 206.975 121.399 206.034 123.625C205.094 125.851 203.716 127.865 201.984 129.55C200.251 131.234 198.198 132.554 195.947 133.431C193.695 134.308 191.29 134.725 188.875 134.656C184.172 134.523 179.707 132.562 176.427 129.188C173.148 125.815 171.313 121.295 171.313 116.591C171.313 111.886 173.148 107.367 176.427 103.993C179.707 100.62 184.172 98.658 188.875 98.525ZM91.2813 188.875C88.4053 188.875 85.6472 190.018 83.6136 192.051C81.58 194.085 80.4375 196.843 80.4375 199.719C80.4375 202.595 81.58 205.353 83.6136 207.387C85.6472 209.42 88.4053 210.563 91.2813 210.563H199.719C202.595 210.563 205.353 209.42 207.386 207.387C209.42 205.353 210.563 202.595 210.563 199.719C210.563 196.843 209.42 194.085 207.386 192.051C205.353 190.018 202.595 188.875 199.719 188.875H91.2813ZM0.916687 145.5C0.916687 65.6467 65.6466 0.916748 145.5 0.916748C225.353 0.916748 290.083 65.6467 290.083 145.5C290.083 225.353 225.353 290.083 145.5 290.083C65.6466 290.083 0.916687 225.353 0.916687 145.5ZM145.5 22.6042C112.906 22.6042 81.647 35.5522 58.5995 58.5996C35.5521 81.647 22.6042 112.906 22.6042 145.5C22.6042 178.094 35.5521 209.353 58.5995 232.401C81.647 255.448 112.906 268.396 145.5 268.396C178.094 268.396 209.353 255.448 232.4 232.401C255.448 209.353 268.396 178.094 268.396 145.5C268.396 112.906 255.448 81.647 232.4 58.5996C209.353 35.5522 178.094 22.6042 145.5 22.6042Z"
                        fill="#CBD5E1"
                      />
                    </svg>
                    <div className="mt-4 text-slate-300">
                      I am really sorry, but I could not find the name you were
                      looking for.
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <ul className="ml-[8rem] space-y-4  mt-4">
                {defaultValues.users.map((user, index) => (
                  <li key={index}>
                    <div className=" static flex items-center justify-between w-auto py-4 border-b-2 ">
                      <div className="flex flex-row items-center">
                        <div className="ml-3 md:ml-[4rem] text-xl">
                          {user.user_id}
                        </div>
                        <div className="absolute left-[19rem]">{user.username}</div>
                        <div className="absolute left-[35rem]">{user.email}</div>
                      </div>
                      <div className="flex flex-row items-center">
                        <div className="mr-[8rem]">{user.teams}</div>
                        <div className="flex  items-center w-0 md:w-auto mr-[5rem]">
                          {formattedDate(user.date)}
                        </div>
                        <div className="mr-5">
                          <select
                            id="invite-members-dropdown"
                            className="items-center  w-auto  bg-white rounded-md border-2 border-blue-900 py-2  px-2"
                            value={user.status}
                            onChange={(event) =>
                              handleStatusChage(user.user_id, event)
                            }
                          >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="visible lg:invisible grid justify-items-center w-[72rem] ">
        <svg
          width="400"
          height="400"
          viewBox="0 0 291 291"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-12"
        >
          <path
            d="M102.125 98.525C104.54 98.4566 106.945 98.8733 109.197 99.7505C111.448 100.628 113.501 101.947 115.234 103.632C116.966 105.316 118.344 107.331 119.284 109.557C120.224 111.782 120.709 114.174 120.709 116.591C120.709 119.007 120.224 121.399 119.284 123.625C118.344 125.851 116.966 127.865 115.234 129.55C113.501 131.234 111.448 132.554 109.197 133.431C106.945 134.308 104.54 134.725 102.125 134.656C97.3318 134.656 92.7349 132.752 89.3455 129.363C85.9562 125.974 84.0521 121.377 84.0521 116.583C84.0521 111.79 85.9562 107.193 89.3455 103.804C92.7349 100.415 97.3318 98.5105 102.125 98.5105V98.525ZM188.875 98.525C191.29 98.4566 193.695 98.8733 195.947 99.7505C198.198 100.628 200.251 101.947 201.984 103.632C203.716 105.316 205.094 107.331 206.034 109.557C206.975 111.782 207.459 114.174 207.459 116.591C207.459 119.007 206.975 121.399 206.034 123.625C205.094 125.851 203.716 127.865 201.984 129.55C200.251 131.234 198.198 132.554 195.947 133.431C193.695 134.308 191.29 134.725 188.875 134.656C184.172 134.523 179.707 132.562 176.427 129.188C173.148 125.815 171.313 121.295 171.313 116.591C171.313 111.886 173.148 107.367 176.427 103.993C179.707 100.62 184.172 98.658 188.875 98.525ZM91.2813 188.875C88.4053 188.875 85.6472 190.018 83.6136 192.051C81.58 194.085 80.4375 196.843 80.4375 199.719C80.4375 202.595 81.58 205.353 83.6136 207.387C85.6472 209.42 88.4053 210.563 91.2813 210.563H199.719C202.595 210.563 205.353 209.42 207.386 207.387C209.42 205.353 210.563 202.595 210.563 199.719C210.563 196.843 209.42 194.085 207.386 192.051C205.353 190.018 202.595 188.875 199.719 188.875H91.2813ZM0.916687 145.5C0.916687 65.6467 65.6466 0.916748 145.5 0.916748C225.353 0.916748 290.083 65.6467 290.083 145.5C290.083 225.353 225.353 290.083 145.5 290.083C65.6466 290.083 0.916687 225.353 0.916687 145.5ZM145.5 22.6042C112.906 22.6042 81.647 35.5522 58.5995 58.5996C35.5521 81.647 22.6042 112.906 22.6042 145.5C22.6042 178.094 35.5521 209.353 58.5995 232.401C81.647 255.448 112.906 268.396 145.5 268.396C178.094 268.396 209.353 255.448 232.4 232.401C255.448 209.353 268.396 178.094 268.396 145.5C268.396 112.906 255.448 81.647 232.4 58.5996C209.353 35.5522 178.094 22.6042 145.5 22.6042Z"
            fill="#CBD5E1"
          />
        </svg>
        <div className="mt-4 text-slate-300 text-3xl">
          I am really sorry, but You must enter pass Notebook or PC
        </div>
      </div>
    </div>
  );
};
export default User;
