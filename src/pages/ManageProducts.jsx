import { useEffect, useState, useMemo, useCallback } from "react";
import { Trash2, Pencil, Eye, Search } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getProducts, deleteProduct } from "../services/productService";

import LazyImage from "../components/common/LazyImage";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Load Products
  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Delete Product
  const handleDelete = useCallback(
    async (id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?",
      );

      if (!confirmDelete) return;

      try {
        await deleteProduct(id);

        toast.success("Product deleted successfully");

        loadProducts();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete product");
      }
    },
    [loadProducts],
  );

  // Optimized Search
  const filteredProducts = useMemo(() => {
    const keyword = search.toLowerCase();

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword),
    );
  }, [products, search]);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#3E2723]">Manage Products</h1>

          <p className="text-gray-500 mt-2">
            Total Products : {products.length}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-[#8B5E3C] text-white">
            <tr>
              <th className="text-left py-4 px-5">Image</th>
              <th className="text-left px-5">Product</th>
              <th className="text-left px-5">Category</th>
              <th className="text-left px-5">Price</th>
              <th className="text-center px-5">Featured</th>
              <th className="text-center px-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-amber-50 transition"
                >
                  <td className="p-4">
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover border shadow-md hover:scale-105 transition"
                    />
                  </td>

                  <td className="px-5 font-semibold">{product.name}</td>

                  <td className="px-5">{product.category}</td>

                  <td className="px-5 font-bold text-[#8B5E3C]">
                    ₹ {product.price}
                  </td>

                  <td className="text-center">
                    {product.featured ? (
                      <span className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐ Featured
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        Normal
                      </span>
                    )}
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                        title="View Product"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        to={`/dashboard/edit/${product.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
                        title="Edit Product"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
