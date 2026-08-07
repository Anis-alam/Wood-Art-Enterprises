import { useEffect, useState } from "react";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../services/categoryService";

import { Folder, Trash2 } from "lucide-react";

export default function Categories() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!categoryName.trim()) return;

    await addCategory(categoryName);

    setCategoryName("");

    loadCategories();
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Delete this category?");

    if (!confirmDelete) return;

    await deleteCategory(id);

    loadCategories();
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#8B5E3C]">Categories</h1>

          <p className="text-gray-500 mt-2">
            Total Categories : {categories.length}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
        >
          <input
            type="text"
            placeholder="Enter Category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border rounded-xl px-4 py-3 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
          />

          <button
            type="submit"
            className="bg-[#8B5E3C] hover:bg-[#6d4c41] text-white px-8 rounded-xl"
          >
            Add
          </button>
        </form>
      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block overflow-hidden rounded-2xl border">
        <table className="w-full">
          <thead className="bg-[#8B5E3C] text-white">
            <tr>
              <th className="text-left px-6 py-4">Category</th>

              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center py-8">
                  No Categories Found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b hover:bg-amber-50 transition"
                >
                  <td className="px-6 py-5 font-medium">{category.name}</td>

                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="lg:hidden space-y-4">
        {categories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No Categories Found
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border shadow-sm bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#8B5E3C] p-3 rounded-full text-white">
                  <Folder size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">{category.name}</h3>

                  <p className="text-sm text-gray-500">Furniture Category</p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(category.id)}
                className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
              >
                <Trash2 size={18} />
                Delete Category
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
