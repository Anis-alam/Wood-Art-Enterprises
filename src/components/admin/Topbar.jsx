import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import { Search, Bell, UserCircle, X, LogOut, Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export default function Topbar() {
  const navigate = useNavigate();

  const { darkMode, setDarkMode } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "Welcome!",
      message: "Welcome to the Wood Art Admin Panel.",
    },
    {
      id: 2,
      title: "Products",
      message: "Manage your uploaded furniture products here.",
    },
    {
      id: 3,
      title: "Enquiries",
      message: "Customer enquiries will appear here.",
    },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }

      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    try {
      await signOut(auth);

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Logout failed.");
    }
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-white shadow px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Left */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3E2723]">
            Dashboard
          </h2>

          <p className="hidden md:block text-gray-500">Wood Art Enterprises</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Dark Mode Toggle */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition duration-300"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-[#3E2723]" />
            )}
          </button>

          {/* Desktop Search */}

          <div className="hidden md:flex items-center border rounded-xl px-4 py-2">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="ml-3 w-56 outline-none"
            />
          </div>

          {/* Mobile Search */}

          <button className="md:hidden w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
            <Search size={20} />
          </button>

          {/* Notifications */}

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="relative w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
            >
              <Bell size={22} />

              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="font-bold text-lg">Notifications</h3>

                  <button onClick={() => setShowNotifications(false)}>
                    <X size={18} />
                  </button>
                </div>

                {notifications.map((item) => (
                  <div key={item.id} className="p-4 border-b hover:bg-gray-50">
                    <h4 className="font-semibold">{item.title}</h4>

                    <p className="text-sm text-gray-500 mt-1">{item.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="hover:scale-105 transition"
            >
              <UserCircle size={40} className="text-[#3E2723]" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-4 w-60 rounded-2xl bg-white shadow-2xl border overflow-hidden">
                <div className="bg-[#3E2723] text-white p-5">
                  <h3 className="font-bold text-lg">Administrator</h3>

                  <p className="text-sm text-gray-300">Admin Panel</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
