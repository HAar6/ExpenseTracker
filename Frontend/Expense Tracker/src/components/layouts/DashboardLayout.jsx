import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu.jsx";
import { logout } from "../../utils/auth"; // import logout utility

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(clearUser, navigate); // clear context + localStorage + redirect
  };

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden min-h-screen flex flex-col justify-between">
            <SideMenu activeMenu={activeMenu} />

            {/* Logout button */}
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded w-full"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
