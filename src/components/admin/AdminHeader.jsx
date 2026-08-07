import { Menu } from "lucide-react";

export default function AdminHeader({ setSidebarOpen }) {
  return (
    <header className="lg:hidden bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <h1 className="text-xl font-bold text-[#3E2723]">WOOD ART</h1>

      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <Menu size={28} />
      </button>
    </header>
  );
}
