import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Folder,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: PlusCircle,
    path: "/dashboard/add-product",
  },
  {
    title: "Manage Products",
    icon: Package,
    path: "/dashboard/products",
  },
  {
    title: "Categories",
    icon: Folder,
    path: "/dashboard/categories",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/dashboard/customers",
  },
  {
    title: "Enquiries",
    icon: MessageSquare,
    path: "/dashboard/enquiries",
    badge: "New",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export default function Sidebar({ closeSidebar }) {
  const navigate = useNavigate();

  async function handleLogout() {
    if (!window.confirm("Are you sure you want to logout?")) return;

    try {
      await signOut(auth);

      if (window.innerWidth < 1024) {
        closeSidebar();
      }

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Logout failed.");
    }
  }

  function handleMobileClose() {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  }

  return (
    <aside className="flex h-screen flex-col bg-[#3E2723] text-white">
      {/* Logo */}
      <div className="border-b border-white/10 p-6 text-center">
        <h1 className="text-3xl font-bold tracking-wide">WOOD ART</h1>
        <p className="mt-1 text-sm text-gray-300">Admin Dashboard</p>
      </div>

      {/* Admin Card */}
      <div className="mx-4 mt-5 rounded-xl bg-[#8B5E3C] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#8B5E3C]">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h3 className="font-semibold">Administrator</h3>
            <p className="text-xs text-gray-200">Wood Art Enterprises</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 overflow-y-auto px-3">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            onClick={handleMobileClose}
            className={({ isActive }) =>
              `group mb-2 flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "border-l-4 border-[#D4AF37] bg-[#8B5E3C]"
                  : "hover:bg-[#4E342E]"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <menu.icon
                size={20}
                className="transition group-hover:scale-110"
              />
              <span className="font-medium">{menu.title}</span>
            </div>

            {menu.badge && (
              <span className="rounded-full bg-red-500 px-2 py-1 text-[10px]">
                {menu.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
