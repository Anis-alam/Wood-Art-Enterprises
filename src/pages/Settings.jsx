import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings size={32} className="text-[#8B5E3C]" />

        <h1 className="text-3xl font-bold text-[#3E2723]">Settings</h1>
      </div>

      <div className="space-y-6">
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold">Admin Information</h2>

          <p className="text-gray-500 mt-2">Wood Art Enterprises Admin Panel</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-semibold">Version</h2>

          <p className="text-gray-500 mt-2">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
