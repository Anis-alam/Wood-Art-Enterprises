import { useEffect, useState } from "react";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../services/categoryService";

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

    if (categoryName.trim() === "") return;

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
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#3E2723]">Categories</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="flex-1 border rounded-xl p-4"
        />

        <button
          type="submit"
          className="bg-[#8B5E3C] text-white px-8 rounded-xl"
        >
          Add
        </button>
      </form>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4">Category Name</th>

            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="py-4">{category.name}</td>

              <td className="text-center">
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
