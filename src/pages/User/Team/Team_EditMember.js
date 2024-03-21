import Loading from "@/components/Loading";
import User_Navbar from "@/components/User_Navbar";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Team_EditMember = () => {
  const router = useRouter();
  const { team_id } = router.query;
  const [role, setRole] = useState("");
  const [memberData, setMemberData] = useState([]);
  const [showOption, setShowOption] = useState([]);
  const [showinvite, setShowinvite] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [removeMember, setRemoveMember] = useState(false);
  const [showMemberSearch, setshowMemberSearch] = useState("");
  const [searchMember, setSearchMember] = useState("");
  const [selectedMemberinviteRole, setSelectedMemberinviteRole] =
    useState("User");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successChangeRole, setSuccessChangerole] = useState(false);
  const { token } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  const [countMember, setCountMember] = useState("");
  const user = token;

  const toReloadPage = useCallback(() => {
    router.reload();
  }, [router]);

  const defaultValues = {
    user: user,
    role: role,
    teamid: team_id,
    memberData: memberData,
    count_member: countMember,
  };

  const sendToken = async () => {
    // for online
    if (team_id !== undefined) {
      console.log("check", team_id);
      axios
        .post(process.env.NEXT_PUBLIC_LINKTEST + "/team/getManagment", {
          access_token: defaultValues.user,
          team_id: team_id,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.status === "200 OK") {
            //wait ton

            const team_data = response.data.member;
            setRole(response.data.role);
            setCountMember(response.data.count_member)
            setMemberData(team_data);
            const newShowOption = Array(team_data.length).fill(false);
            setShowOption(newShowOption);
          } else {
            console.log("Error sendToken")
          }
        });
    }
  };
  const Invite_member = (email, selectedRole) => {
    setLoading(true)
    console.log(email,selectedRole)
    const api = process.env.NEXT_PUBLIC_LINKTEST + "/notification/inviteUser";
    axios
      .post(api, {
        access_token: defaultValues.user,
        team_id: team_id,
        email: email,
        role: selectedRole,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "200 OK") {
          setLoading(false)
          setShowinvite(!showinvite);
          toReloadPage();
        } else if (response.data.status === "404: Not Found Data") {
          setErrMsg('Not found Data');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // local test
    //toReloadPage();
  };

  const edit_Rolemember = (member_id, role) => {
    //wait ton api
    if (team_id !== undefined) {
      console.log(defaultValues.user, team_id, member_id, role)
      const api = process.env.NEXT_PUBLIC_LINKTEST + "/privilege/change_role";
      axios
        .post(api, {
          access_token: defaultValues.user,
          team_id: team_id,
          changed_id: member_id,
          change_role: role,
        })
        .then(function (response) {
          console.log(response);
          if (response.data === "200 OK") {
            updateMemberRole(member_id, role);
            setSuccessChangerole(true);
            setTimeout(() => {
              setSuccessChangerole(false);
            }, 9000);
            toReloadPage();
            // wait me dev
          } else {
            // wait me dev
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const extractImagePath = (fullPath) => {
    const newPath = process.env.NEXT_PUBLIC_USER_IMAGE + fullPath
    console.log(newPath)
    return newPath;
  };

  const delMember = async (member_id) => {
    console.log(defaultValues.user, team_id, member_id)
    axios
      .post(process.env.NEXT_PUBLIC_LINKTEST + "/privilege/kick_user_from_team", {
        access_token: defaultValues.user,
        team_id: team_id,
        changed_id: member_id,
      })
      .then(function (response) {
        console.log(response);
        if (response.data === "200 OK") {
          toReloadPage();
        } else {
          console.log("ERRor");
        }
      });
  };

  const updateMemberRole = (memberId, newRole) => {
    console.log(memberId, newRole)
    setMemberData((prevMemberData) => {
      return prevMemberData.map((member) => {
        if (member.Member_id === memberId) {
          return { ...member, Member_Role: newRole };
        }
        return member;
      });
    });
  };

  const handleSearch = () => {
    const Team = defaultValues.memberData;
    console.log(searchMember);
    if (searchMember !== "") {
      const filteredNames = Team.filter((name) =>
        name.member_name.toLowerCase().includes(searchMember.toLowerCase())
      );
      setshowMemberSearch(filteredNames);
    } else setshowMemberSearch("");
  };
  const handleInvite_member = () => {
    setShowinvite(!showinvite);
  };
  const handleDropdownChange = (event) => {
    setSelectedMemberinviteRole(event.target.value);
  };
  const handleDropdownRole = (event, member_id) => {
    console.log(member_id)

    edit_Rolemember(member_id, event.target.value);
    //test local
    // setSuccessChangerole(true);
    // setTimeout(() => {
    //   setSuccessChangerole(false);
    // }, 9000);
  };
  const handleToggleDropdown = (index) => {
    setShowOption((prevShowOption) => {
      const newShowOption = [...prevShowOption];
      newShowOption[index] = !newShowOption[index];
      return newShowOption;
    });
  };
  const handleCloseChangeRole = () => {
    setSuccessChangerole(false);
  };
  const handleRemoveMember = () => {
    setRemoveMember(!removeMember);
  };
  const handleRemoveMember_OK = (member_id) => {
    delMember(member_id);
  };
  const validate = (value) => {
    let err = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (email === "") {
      err["Email"] = "Please enter your email";
    } else if (!regex.test(email)) {
      err["Email"] = "Incorrect Format";
    }
    console.log("error ->", err);
    return err;
  };

  const handleSubmitInvite_member = (e) => {
    console.log(email, selectedMemberinviteRole);
    e.preventDefault();
    const error = validate(email);
    setFormErrors(error);
    console.log("check", Object.keys(error).length);
    if (Object.keys(error).length === 0) {

      Invite_member(email, selectedMemberinviteRole);
      setSelectedMemberinviteRole("User");
      setEmail("");
    }
  };

  let time = 1;
  useEffect(() => {
    if (user === "null") {
      router.push({
        pathname: "/sign_in",

      });
    }
    const token = user;
    localStorage.setItem("token", token);
    document.body.style.backgroundColor = "#cbd5e1";
    console.log("ok");
    if (time === 1) {
      sendToken();
      time--;
    }

  }, [team_id]);

  return (
    <div className="Create_team_background">
      <Head>
        <style>
          {`
           @import url("https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=Oswald:wght@500&family=Poppins&family=Raleway:wght@100;600;700&display=swap");
          `}
        </style>
      </Head>
      <div>
      {loading && (
          <Loading />
        )}
        <User_Navbar user={defaultValues.user} />
        <div className="py-9 px-5 mt-[4.5rem]">
          <div className="p-4 md:p-10  md:w-auto  h-auto bg-white rounded-md border border-blue-950 font-Poppins">
            <div className="flex justify-between ">
              <div className=" flex">
                <div className="text-2xl mt-1 font-bold">Member</div>
                <div className=" ml-4 bg-blue-900 px-3 py-1 text-xl text-white rounded-md">
                  {defaultValues.count_member}
                </div>
              </div>

              <button
                className="flex flex-row bg-blue-800 text-white font-[Poppins] py-2 px-4 rounded-md 
                      hover:bg-blue-950 text-lg  font-Poppins"
                onClick={handleInvite_member}
              >
                <svg
                  width="29"
                  height="18"
                  viewBox="0 0 29 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-2 md:mt-1 md:mr-4"
                >
                  <path
                    d="M22.2236 14.833V17.1663H8.19884V14.833C8.19884 14.833 8.19884 10.1663 15.2112 10.1663C22.2236 10.1663 22.2236 14.833 22.2236 14.833ZM18.7174 4.33301C18.7174 3.64077 18.5118 2.96409 18.1265 2.38851C17.7413 1.81294 17.1937 1.36434 16.553 1.09943C15.9123 0.834524 15.2073 0.765213 14.5272 0.900261C13.8471 1.03531 13.2223 1.36865 12.732 1.85814C12.2416 2.34762 11.9077 2.97126 11.7724 3.65019C11.6371 4.32913 11.7066 5.03286 11.9719 5.6724C12.2373 6.31194 12.6867 6.85857 13.2633 7.24315C13.8399 7.62774 14.5178 7.83301 15.2112 7.83301C16.1411 7.83301 17.0329 7.46426 17.6905 6.80788C18.348 6.15151 18.7174 5.26127 18.7174 4.33301ZM22.4574 10.2363C23.0962 10.8247 23.6113 11.5342 23.9725 12.3234C24.3337 13.1126 24.5338 13.9658 24.5611 14.833V17.1663H28.0673V14.833C28.0673 14.833 28.0673 10.808 22.4574 10.2363ZM21.0549 0.833009C20.7018 0.83322 20.3508 0.888325 20.0147 0.996342C20.6985 1.97514 21.0651 3.13972 21.0651 4.33301C21.0651 5.5263 20.6985 6.69088 20.0147 7.66967C20.3508 7.77769 20.7018 7.8328 21.0549 7.83301C21.9848 7.83301 22.8766 7.46426 23.5341 6.80788C24.1917 6.15151 24.5611 5.26127 24.5611 4.33301C24.5611 3.40475 24.1917 2.51451 23.5341 1.85814C22.8766 1.20176 21.9848 0.833009 21.0549 0.833009ZM9.36757 6.66634H5.86138V3.16634H3.52392V6.66634H0.0177307V8.99968H3.52392V12.4997H5.86138V8.99968H9.36757V6.66634Z"
                    fill="white"
                  />
                </svg>
                <div className="hidden md:block">invite member</div>
              </button>
            </div>
            {showinvite && (
              <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <div className="flex mt-3">
                              {errMsg ? (
                                <p
                                  className="flex item-center text-red-900 text-xl"
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
                            <h3
                              className="text-xl font-semibold leading-6 text-gray-900 mb-5"
                              id="modal-title"
                            >
                              Invite Member
                            </h3>
                            <div>
                              <p className="text-sm md:text-lg text-gray-500 mb-3">
                                You can invite your friend here!!!
                              </p>
                            </div>
                            <div className="md:w-[28rem]">
                              <label
                                htmlFor="Email"
                                className="block text-sm leading-6 font-bold text-gray-900 md:text-lg mb-2 "
                              >
                                Enter Email
                              </label>
                              <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                // pattern="[A-Za-z0-9]"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="input-input-signup mb-2"
                              />
                              <p className="text-red-600 mb-2">
                                {formErrors.Email}
                              </p>
                              <label
                                htmlFor="role"
                                className="block text-sm leading-6 text-gray-900 font-bold  md:text-lg mb-2 "
                              >
                                select role
                              </label>
                              {((defaultValues.role === "Owner" || defaultValues.role === "Admin") && (
                                <div>
                                  <select
                                    id="invite-members-dropdown"
                                    className="gl-form-select custom-select input-input-signup"
                                    data-qa-selector="access_level_dropdown"
                                    aria-describedby="__BVID__791__BV_description_"
                                    onChange={handleDropdownChange}
                                    value={selectedMemberinviteRole}
                                  >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                  </select>
                                </div>
                              )) || (
                                  <div>
                                    <select
                                      id="invite-members-dropdown"
                                      className="gl-form-select custom-select input-input-signup"
                                      data-qa-selector="access_level_dropdown"
                                      aria-describedby="__BVID__791__BV_description_"
                                      onChange={handleDropdownChange}
                                      value={selectedMemberinviteRole}
                                    >
                                      <option value="User">User</option>
                                    </select>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                          onClick={handleSubmitInvite_member}
                        >
                          Invite
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto"
                          onClick={handleInvite_member}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-5">
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
                    className="block w-full py-4 ps-2 text-sm text-gray-900 border border-blue-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by Member name"
                    required
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                  ></input>
                  <button
                    id="submitSearch"
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            <div className="flex justify-between py-7 border-b-2 border-blue-950 text-gray-900 font-bold text-xl">
              <div className="">Account</div>
              <div className="flex flex-row">
                <div className="md:px-10 mr-2">Role</div>

              </div>
            </div>
            {showMemberSearch ? (
              <div>
                {showMemberSearch.length !== 0 ? (
                  <ul className="relative space-y-5 mt-7">
                    {showMemberSearch.map((member, index) => (
                      <li key={index} id="member">
                        <div className=" static flex items-center justify-between w-auto  border-b-2 ">
                          <div className="flex flex-row items-center">
                            <img
                              className="h-10 md:h-[4rem] w-0 md:w-20  md:ml-3 fill-red-300 invisible md:visible"
                              src={member.profile_image}
                              alt="SVG Image"
                            />
                            <div className="ml-3 md:ml-5 text-xl">
                              {member.member_name}
                            </div>
                          </div>
                          <div className="flex flex-row items-center">
                            {member.Role === "Owner" ? (
                              <div className="flex items-center  w-auto  bg-white rounded-md border-2 border-blue-900 p-2 md:mr-2 md:px-2">
                                Owner
                              </div>
                            ) : (

                              <div>
                                <select
                                  id="invite-members-dropdown"
                                  className="flex items-center  w-auto  bg-white rounded-md border-2 border-blue-900 p-2 md:mr-2 px-2"
                                  data-qa-selector="access_level_dropdown"
                                  aria-describedby="__BVID__791__BV_description_"
                                  onChange={(event) =>
                                    handleDropdownRole(event, member.user_id)
                                  }
                                  value={member.Role}
                                >
                                  <option value="User">User</option>
                                  <option value="Admin">Admin</option>
                                </select>
                              </div>
                            )}



                            <button
                              aria-haspopup="true"
                              className="cursor-pointer"
                              onClick={() => handleToggleDropdown(index)}
                            >
                              <svg
                                width="6"
                                height="26"
                                viewBox="0 0 6 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-3 ml-5 flex "
                              >
                                <circle cx="3" cy="3" r="3" fill="#1E3A8A" />
                                <circle cx="3" cy="13" r="3" fill="#1E3A8A" />
                                <circle cx="3" cy="23" r="3" fill="#1E3A8A" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {showOption[index] && (
                          <div className="right-5 absolute z-10  ">
                            <div className=" flex-auto overflow-hidden rounded-3xl bg-white text-sm  shadow-lg ring-1 ring-gray-900/5">
                              <div className="group relative flex  rounded-lg p-4 ">
                                <div>
                                  <div>
                                    <button
                                      className="relative font-semibold text-red-600 text-lg "
                                      onClick={handleRemoveMember}
                                    >
                                      Remove member
                                    </button>
                                    {removeMember && (
                                      <div
                                        className="relative z-10"
                                        aria-labelledby="modal-title"
                                        role="dialog"
                                        aria-modal="true"
                                      >
                                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                                                  Are you sure you want to
                                                  remove {member.Member_name}{" "}
                                                  from team?
                                                </div>

                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                  <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 sm:ml-3 sm:w-auto"
                                                    onClick={() =>
                                                      handleRemoveMember_OK(
                                                        member.user_id
                                                      )
                                                    }
                                                  >
                                                    Confirm Remove
                                                  </button>
                                                  <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-blue-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  hover:text-white sm:mt-0 sm:w-auto"
                                                    onClick={() => {
                                                      handleRemoveMember(index);
                                                      handleToggleDropdown(
                                                        index
                                                      );
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
                        )}
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
              <ul className="relative space-y-5 mt-7">
                {defaultValues.memberData.map((member, index) => (
                  <li key={index}>
                    <div className=" static flex items-center justify-between w-auto  border-b-2 ">
                      <div className="flex flex-row items-center">
                        <img
                          className="h-10 md:h-[4rem] w-0 md:w-20  md:ml-3 fill-red-300 invisible md:visible"
                          src={extractImagePath(member.profile_image)}
                          alt="SVG Image"
                        />
                        <div className="ml-3 md:ml-5 text-xl">
                          {member.member_name}
                        </div>
                      </div>
                      <div className="flex flex-row items-center">
                        {member.Role === "Owner" ? (
                          <div className="flex items-center  w-auto  bg-white rounded-md border-2 border-blue-900 p-2 md:mr-2 md:px-2">
                            Owner
                          </div>
                        ) : (
                          <div>
                            <select
                              id="invite-members-dropdown"
                              className="flex items-center  w-auto  bg-white rounded-md border-2 border-blue-900 p-2 md:mr-2 px-2"
                              data-qa-selector="access_level_dropdown"
                              aria-describedby="__BVID__791__BV_description_"
                              onChange={(event) =>
                                handleDropdownRole(event, member.user_id)
                              }
                              value={member.Role}
                            >
                              <option value="User">User</option>
                              <option value="Admin">Admin</option>
                            </select>
                          </div>
                        )}

                        <div className="flex invisible md:visible items-center w-0 md:w-auto ">
                          {member.Date_come_in}
                        </div>

                        <button
                          aria-haspopup="true"
                          className="cursor-pointer"
                          onClick={() => handleToggleDropdown(index)}
                        >
                          <svg
                            width="6"
                            height="26"
                            viewBox="0 0 6 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-3 ml-5 flex "
                          >
                            <circle cx="3" cy="3" r="3" fill="#1E3A8A" />
                            <circle cx="3" cy="13" r="3" fill="#1E3A8A" />
                            <circle cx="3" cy="23" r="3" fill="#1E3A8A" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {showOption[index] && (
                      <div className="right-5 absolute z-10  ">
                        <div className=" flex-auto overflow-hidden rounded-3xl bg-white text-sm  shadow-lg ring-1 ring-gray-900/5">
                          <div className="group relative flex  rounded-lg p-4 ">
                            <div>
                              <div>
                                <button
                                  className="relative font-semibold text-red-600 text-lg "
                                  onClick={handleRemoveMember}
                                >
                                  Remove member
                                </button>
                                {removeMember && (
                                  <div
                                    className="relative z-10"
                                    aria-labelledby="modal-title"
                                    role="dialog"
                                    aria-modal="true"
                                  >
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                                              Are you sure you want to remove{" "}
                                              {member.Member_name} from team?
                                            </div>

                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                              <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 sm:ml-3 sm:w-auto"
                                                onClick={() =>
                                                  handleRemoveMember_OK(
                                                    member.user_id
                                                  )
                                                }
                                              >
                                                Confirm Remove
                                              </button>
                                              <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-blue-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  hover:text-white sm:mt-0 sm:w-auto"
                                                onClick={() => {
                                                  handleRemoveMember(index);
                                                  handleToggleDropdown(index);
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
                    )}
                  </li>
                ))}
              </ul>
            )}
            {successChangeRole && (
              <div
                className="flex flex-row absolute transition duration-300 delay-150 bottom-6 left-6 bg-green-200 p-4 text-xl rounded-md drop-shadow-lg text-green-900
              border-t-4 border-green-600"
              >
                <div className="mr-5">Role updated successfully</div>
                <button onClick={handleCloseChangeRole}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team_EditMember;
