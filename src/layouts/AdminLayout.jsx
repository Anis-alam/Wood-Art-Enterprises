import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-[#F5F6FA] overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-64 transform bg-[#3E2723] transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="lg:hidden absolute top-4 right-4">
          <button onClick={() => setSidebarOpen(false)} className="text-white">
            <X />
          </button>
        </div>

        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow px-5 py-4 flex items-center justify-between">
          <h1 className="font-bold text-xl">WOOD ART</h1>

          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        <Topbar />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
