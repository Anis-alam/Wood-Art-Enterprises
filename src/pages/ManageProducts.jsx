import { useEffect, useState, useMemo, useCallback } from "react";
import { Trash2, Pencil, Eye, Search, Package, Star } from "lucide-react";
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

  // Search
  const filteredProducts = useMemo(() => {
    const keyword = search.toLowerCase();

    return products.filter(
      (product) =>
        product.name?.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword),
    );
  }, [products, search]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-[#8B5E3C]">Manage Products</h1>

          <p className="mt-2 text-gray-500">
            Total Products : {filteredProducts.length}
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
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
          />
        </div>
      </div>
      {/* ===========================
          Desktop Table
      ============================ */}

      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
        <table className="min-w-full">
          <thead className="bg-[#8B5E3C] text-white">
            <tr>
              <th className="text-left px-5 py-4">Image</th>
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
                <td colSpan="6" className="py-12 text-center text-gray-500">
                  No Products Found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-amber-50 transition"
                >
                  {/* Image */}

                  <td className="p-4">
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover border shadow"
                    />
                  </td>

                  {/* Product */}

                  <td className="px-5">
                    <h3 className="font-semibold">{product.name}</h3>
                  </td>

                  {/* Category */}

                  <td className="px-5">{product.category}</td>

                  {/* Price */}

                  <td className="px-5 font-bold text-[#8B5E3C]">
                    ₹ {product.price}
                  </td>

                  {/* Featured */}

                  <td className="text-center">
                    {product.featured ? (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <Star size={14} />
                        Featured
                      </span>
                    ) : (
                      <span className="inline-flex bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        Normal
                      </span>
                    )}
                  </td>

                  {/* Actions */}

                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        to={`/dashboard/edit/${product.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
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
      {/* ===========================
          Mobile Cards
      ============================ */}

      <div className="lg:hidden space-y-5">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No Products Found
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border bg-white shadow-sm overflow-hidden"
            >
              {/* Product Image */}
              <LazyImage
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                {/* Product Name */}
                <h2 className="text-xl font-bold text-[#3E2723]">
                  {product.name}
                </h2>

                {/* Category */}
                <div className="mt-3 flex items-center gap-2">
                  <Package size={18} className="text-[#8B5E3C]" />
                  <span className="text-gray-600">{product.category}</span>
                </div>

                {/* Price */}
                <p className="mt-4 text-2xl font-bold text-[#8B5E3C]">
                  ₹ {product.price}
                </p>

                {/* Featured */}
                <div className="mt-4">
                  {product.featured ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold">
                      <Star size={16} />
                      Featured Product
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-gray-100 px-4 py-2 text-gray-600">
                      Normal Product
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 py-3 text-white hover:bg-blue-600 transition"
                  >
                    <Eye size={18} />
                    View
                  </Link>

                  <Link
                    to={`/dashboard/edit/${product.id}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 text-white hover:bg-yellow-600 transition"
                  >
                    {/* <Pencil size={18} />
                    Edit */}
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-white hover:bg-red-600 transition"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
