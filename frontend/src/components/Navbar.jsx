import React from "react";
import { Code, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout.jsx";

const Navbar = () => {
  // navbar is shown only when the user is logged in aor signed up
  const { authUser } = useAuthStore();


  return (
    <nav className="sticky top-0 z-50 w-full py-5">
      <div className="flex w-full justify-between mx-auto max-w-4xl bg-black-700/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/code-svgrepo-com.svg"
            className="h-18 w-18 bg-primary/20 text-primary border-none px-2 py-2 rounded-full"
          />
          <span className="text-lg md:text-2xl font-bold tracking-tight text-white hidden md:block">
            CodeCrack
          </span>
        </Link>

        {/* User Profile and Dropdown */}
        <div className="flex items-center gap-8">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar flex flex-row "
            >
              <div className="w-10 rounded-full ">
                <img
                  src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
            >
              {/* Admin Option */}

              {/* Common Options */}
              <li>
                {/* here below the authUser brings all the user data which we get in results 
                in postman when hitting the /profile route that route had a name, email,
                password and role info so we can call anything from it
                 */}
                <p className="text-base font-semibold">{authUser?.name}</p>
                <hr className="border-gray-200/10" />
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-primary hover:text-white text-base font-semibold"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </li>

              {/* below option can only be accessed by the admins 
              checks if the user is an admin ir user
              if the user is an admin then only the below li is shown otherwise no*/}
              {authUser?.role === "ADMIN" && (
                <li>
                  {/* before accessing the /addproblem the app.jsx checks again through admin route
                  if the user is an admin or not*/}
                  <Link
                    to="/add-problem"
                    className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Add Problem
                  </Link>
                </li>
              )}
              <li>

                {/* this logout button is created in components */}
                <LogoutButton className="hover:bg-primary hover:text-white">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
