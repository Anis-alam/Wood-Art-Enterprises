import { Users } from "lucide-react";

export default function Customers() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-8">
        <Users size={32} className="text-[#8B5E3C]" />

        <h1 className="text-3xl font-bold text-[#3E2723]">Customers</h1>
      </div>

      <div className="border rounded-2xl p-10 text-center">
        <Users size={70} className="mx-auto text-gray-300" />

        <h2 className="text-2xl font-semibold mt-6">No Customers Yet</h2>

        <p className="text-gray-500 mt-3">
          Customers will appear here after they create an account.
        </p>
      </div>
    </div>
  );
}
