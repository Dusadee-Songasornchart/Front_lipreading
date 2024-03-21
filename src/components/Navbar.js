import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  let [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  console.log(open);
  let Sign_in_link = [{ name: "Sign In", link: "/sign_in " }];
  return (
    <nav className="bg-blue-900 shadow-md fixed w-full top-0 left-0 z-20 font-Poppins ">
      <div className="md:flex items-center justify-between bg-blue-900 py-4 md:px-10 px-5">
        <div className="flex justify-between items-center duration-500 z-20">
          <Link href="/">
          <svg
              width="38"
              height="38"
              viewBox="0 0 79 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="8" y="8" width="68" height="60" fill="#1e3a8a" />
              <path
                d="M12.7021 0.0631145C5.74363 0.745628 0.529714 6.20574 0.0688887 13.2909C-0.0561925 15.2344 0.00305651 64.9539 0.134721 65.7989C1.1222 72.286 5.90162 77.0279 12.3137 77.8859C13.6896 78.0712 66.2303 78.0159 67.198 77.8274C71.9149 76.9174 75.8023 74.0443 77.5863 70.1475C78.2447 68.7077 78.587 67.6254 78.8273 66.2214C78.982 65.3049 79.0741 14.1034 78.9227 12.5661C78.6266 9.47594 77.2888 6.57325 75.1237 4.32286C72.9585 2.07246 70.0911 0.604528 66.9808 0.154116C66.0492 0.0241137 14.0286 -0.0668881 12.7021 0.0631145ZM36.5235 20.051C38.8507 22.3488 40.7532 24.2728 40.7532 24.3248C40.7532 24.4028 38.877 24.4223 31.5696 24.4223C21.3459 24.4223 21.8594 24.3963 20.7534 24.9424C16.9845 26.8274 16.8857 32.0925 20.5822 34.0425C21.7014 34.6275 21.4545 34.608 26.2602 34.6665C30.8817 34.725 31.1154 34.7413 32.7645 35.1638C37.6854 36.4248 41.6123 40.4939 42.6887 45.447C43.0953 47.2901 43.1107 49.1964 42.7339 51.0456C42.357 52.8949 41.596 54.6469 40.499 56.1912C39.402 57.7355 37.9927 59.0386 36.36 60.0181C34.7274 60.9977 32.9069 61.6325 31.0133 61.8826C29.8711 62.0321 9.27223 62.0451 9.27223 61.8956C9.27223 61.8436 11.1583 59.939 13.4625 57.664L17.6461 53.5267L23.8014 53.4942C30.615 53.4649 30.2859 53.4877 31.4577 52.9352C32.206 52.5824 32.8571 52.0565 33.3557 51.4023C33.8542 50.748 34.1856 49.9847 34.3216 49.177C34.4576 48.3693 34.3943 47.5412 34.1369 46.7628C33.8796 45.9845 33.4359 45.2789 32.8435 44.706C31.4248 43.3085 30.964 43.2077 26.0957 43.2045C20.1642 43.2045 18.3143 42.7982 15.388 40.8612C5.25647 34.1465 8.3045 18.6405 20.2432 16.1704C21.494 15.9104 21.9614 15.8909 27.1885 15.8812L32.2938 15.8714L36.5202 20.0478M69.6568 15.9657C69.6568 16.0209 67.7543 17.9417 65.4304 20.2395L61.204 24.4191H46.632L42.3661 20.2005C40.9248 18.7949 39.5027 17.3701 38.1002 15.9267C38.1002 15.8942 45.2002 15.8682 53.8769 15.8682C66.4278 15.8682 69.6568 15.8877 69.6568 15.9657ZM61.2237 38.9111L61.204 43.1622H46.5596L46.451 42.8567C45.345 39.7951 44.1633 37.8939 42.0205 35.7261C41.6833 35.4028 41.3625 35.0633 41.0593 34.7088C41.0593 34.6763 45.6017 34.6568 51.1514 34.6568H61.2435L61.2237 38.9111ZM65.4304 57.6965C66.8585 59.0881 68.2674 60.4988 69.6568 61.9281C69.6568 61.9606 63.2217 61.9866 55.3581 61.9866C47.4944 61.9866 41.0593 61.9606 41.0593 61.9281C41.0593 61.8956 41.3984 61.5381 41.8098 61.1383C43.8784 59.1648 45.4363 56.7292 46.3522 54.0369L46.5267 53.5169H61.2007L65.4304 57.6965Z"
                fill="white"
              />
            </svg>
          </Link>
          <div
            onClick={toggleMenu}
            className="h-auto w-auto  mx-2 md:hidden block text-white rounded-md size "
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            )}
          </div>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-8 absolute md:static  
          bg-blue-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20" : "top-[-490px]"
          }`}
        >
          {Sign_in_link.map((link) => (
            <li
              key={link.name}
              className="md:ml-3 text-xl md:my-0 my-5 font-bold underline underline-offset-2 "
            >
              <a
                href={link.link}
                className="text-white hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          <Link href="/sign_up">
            <button
              className=" md:ml-3 bg-white text-cyan-950 rounded-md px-3 py-2 text-lg font-bold hover:text-gray-400 hover-bg-red
    duration-500 relative"
            >
              Sign Up
            </button>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
