import { Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellFilled,
} from "@ant-design/icons";
import { FaUserLarge, FaPencil, FaPowerOff } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo-web.png";
import axios from "axios";
import { getUserInfo } from "../../utility/user";

function DashboardHeader({ collapsed, setCollapsed }) {
  const userRegistrationNo = getUserInfo().registration_no;

  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleContentClick = (event) => {
    // Prevent event propagation to the parent elements
    event.stopPropagation();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/users/registration-no/${userRegistrationNo}`
      );
      setUser(data);
    };
    fetchUser();
  }, [userRegistrationNo]);

  return (
    <div className="flex justify-between items-center shadow-lg px-6 fixed top-0 left-0 right-0 bg-white z-50">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-20" />
        </Link>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/notifications"
          className="rounded-full flex justify-center items-center h-10 w-10 bg-[#532356] text-white font-bold"
        >
          <BellFilled style={{ fontSize: 24 }} />
        </Link>
        <div className="relative" onClick={toggleProfile} ref={profileRef}>
          <button className="h-10 w-10 border-2 flex justify-center items-center border-black rounded-full cursor-pointer">
            <FaUserLarge className="text-xl" />
          </button>
          {isProfileOpen && (
            <div
              className="absolute top-10 right-0 w-64 z-50 shadow-lg transition-all duration-300"
              onClick={handleContentClick}
            >
              <div className="bg-[#efefef] flex justify-center items-center py-4">
                <p className="border-2 border-black rounded-full h-20 w-20 flex justify-center items-center">
                  <FaUserLarge className="text-5xl" />
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-1 py-4 bg-white">
                <p className="text-sm">{user?.name}</p>
                <p className="text-sm">{user?.registration_no}</p>
              </div>
              <div className="pb-10 pt-1  px-10 flex justify-between bg-white">
                <p className="border border-gray-500 text-gray-500 rounded-full h-10 w-10 flex justify-center items-center cursor-pointer">
                  <FaPencil />
                </p>
                <p className="border border-gray-500 text-gray-500 rounded-full h-10 w-10 flex justify-center items-center cursor-pointer">
                  <IoEye />
                </p>
                <p
                  onClick={logout}
                  className="border border-gray-500 text-gray-500 hover:bg-red-500 hover:text-white hover:border-0 rounded-full h-10 w-10 flex justify-center items-center cursor-pointer"
                >
                  <FaPowerOff />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
