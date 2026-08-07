import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import SEO from "../components/common/SEO";
import LazyImage from "../components/common/LazyImage";
import SkeletonCard from "../components/common/SkeletonCard";
import { getProducts } from "../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let data = [...products];

    if (category !== "All") {
      data = data.filter((item) => item.category === category);
    }

    if (search.trim() !== "") {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredProducts(data);
  }, [search, category, products]);

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  return (
    <>
      <SEO
        title="Furniture Collection | Wood Art Enterprises"
        description="Browse our premium wooden furniture collection including sofas, beds, wardrobes, dining tables, office furniture and custom furniture."
        keywords="wood furniture, sofa, bed, wardrobe, dining table, office furniture, premium furniture"
      />

      <section className="py-28 bg-[#faf7f2] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}

          <div className="text-center mb-14">
            <h1 className="text-5xl font-bold text-[#3E2723]">Our Products</h1>

            <p className="text-gray-500 mt-4">
              Explore our premium handcrafted furniture collection.
            </p>
          </div>

          {/* Search & Filter */}

          <div className="flex flex-col md:flex-row gap-5 mb-10">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Products */}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-7xl mb-5">📦</div>

              <h2 className="text-3xl font-bold text-[#3E2723]">
                No Products Found
              </h2>

              <p className="mt-3 text-gray-500">
                Try searching with another keyword or choose a different
                category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-6 bg-[#8B5E3C] hover:bg-[#6D4C41] text-white px-8 py-3 rounded-xl transition duration-300"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="overflow-hidden">
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#3E2723] line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-gray-500">{product.category}</p>

                    <p className="mt-3 text-2xl font-bold text-[#8B5E3C]">
                      ₹ {product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
