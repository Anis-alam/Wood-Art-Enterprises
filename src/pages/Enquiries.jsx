import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Search,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Download,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

import { getEnquiries, deleteEnquiry } from "../services/enquiryService";

import { exportEnquiries } from "../utils/exportEnquiries";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");

  const loadEnquiries = useCallback(async () => {
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load enquiries");
    }
  }, []);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;

    try {
      await deleteEnquiry(id);

      setEnquiries((prev) => prev.filter((item) => item.id !== id));

      toast.success("Enquiry deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete enquiry");
    }
  }, []);

  const filteredEnquiries = useMemo(() => {
    const keyword = search.toLowerCase();

    return enquiries.filter(
      (item) =>
        item.name?.toLowerCase().includes(keyword) ||
        item.phone?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword) ||
        item.city?.toLowerCase().includes(keyword),
    );
  }, [search, enquiries]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-[#8B5E3C]">
            Customer Enquiries
          </h1>

          <p className="text-gray-500 mt-2">
            Total Enquiries : {filteredEnquiries.length}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full md:w-80">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search enquiry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
          </div>

          <button
            onClick={() => exportEnquiries(filteredEnquiries)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Export Excel
          </button>
        </div>
      </div>
      {/* No Data */}

      {filteredEnquiries.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No enquiries found.
        </div>
      ) : (
        <>
          {/* =========================
              Desktop Table
          ========================== */}

          <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-[#8B5E3C] text-white">
                <tr>
                  <th className="text-left px-5 py-4">Customer</th>

                  <th className="text-left px-5">Contact</th>

                  <th className="text-left px-5">Location</th>

                  <th className="text-left px-5">Message</th>

                  <th className="text-left px-5">Date</th>

                  <th className="text-center px-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEnquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-amber-50 transition"
                  >
                    <td className="px-5 py-5 font-semibold text-[#3E2723]">
                      {item.name}
                    </td>

                    <td className="px-5">
                      <div className="space-y-2">
                        <a
                          href={`tel:${item.phone}`}
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <Phone size={16} />
                          {item.phone}
                        </a>

                        {item.email && (
                          <a
                            href={`mailto:${item.email}`}
                            className="flex items-center gap-2 text-green-600 hover:underline"
                          >
                            <Mail size={16} />
                            {item.email}
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="px-5">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-red-500" />
                        {item.city || "-"}
                      </div>
                    </td>

                    <td className="px-5 max-w-xs">
                      <p className="line-clamp-2 text-gray-600">
                        {item.message}
                      </p>
                    </td>

                    <td className="px-5">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={16} />

                        {item.createdAt?.toDate
                          ? item.createdAt.toDate().toLocaleDateString()
                          : "-"}
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =========================
              Mobile Cards
          ========================== */}

          <div className="lg:hidden space-y-4">
            {filteredEnquiries.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border shadow-sm p-5"
              >
                {/* Customer */}

                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#8B5E3C] text-white rounded-full p-3">
                    <User size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>

                    <p className="text-sm text-gray-500">Customer</p>
                  </div>
                </div>

                {/* Phone */}

                <a
                  href={`tel:${item.phone}`}
                  className="flex items-center gap-3 py-2 text-blue-600"
                >
                  <Phone size={18} />
                  {item.phone}
                </a>

                {/* Email */}

                {item.email && (
                  <a
                    href={`mailto:${item.email}`}
                    className="flex items-center gap-3 py-2 text-green-600"
                  >
                    <Mail size={18} />
                    {item.email}
                  </a>
                )}

                {/* City */}

                <div className="flex items-center gap-3 py-2">
                  <MapPin size={18} className="text-red-500" />

                  <span>{item.city || "-"}</span>
                </div>

                {/* Date */}

                <div className="flex items-center gap-3 py-2">
                  <Calendar size={18} className="text-gray-500" />

                  <span>
                    {item.createdAt?.toDate
                      ? item.createdAt.toDate().toLocaleDateString()
                      : "-"}
                  </span>
                </div>

                {/* Message */}

                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="text-gray-700">{item.message}</p>
                </div>

                {/* Delete */}

                <button
                  onClick={() => handleDelete(item.id)}
                  className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete Enquiry
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
