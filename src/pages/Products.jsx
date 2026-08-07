import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

  const [searchParams] = useSearchParams();

  const urlCategory = searchParams.get("category") || "All";

  const [category, setCategory] = useState(urlCategory);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

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
      data = data.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (search.trim() !== "") {
      data = data.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredProducts(data);
  }, [products, category, search]);

  const categories = ["All", ...new Set(products.map((item) => item.category))];
  return (
    <>
      <SEO
        title="Products | Wood Art Enterprises"
        description="Explore premium furniture collection."
      />

      <section className="min-h-screen bg-[#faf7f2] py-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* Heading */}

          <div className="mb-14 text-center">
            <h1 className="text-5xl font-bold text-[#3E2723]">
              {category === "All" ? "Our Products" : category}
            </h1>

            <p className="mt-4 text-gray-500">
              Explore our premium handcrafted furniture collection.
            </p>
          </div>
          <div className="mb-10 flex flex-col gap-5 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
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
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <div className="mb-5 text-7xl">📦</div>

              <h2 className="text-3xl font-bold text-[#3E2723]">
                No Products Found
              </h2>

              <p className="mt-3 text-gray-500">
                Try another search or choose a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-6 rounded-xl bg-[#8B5E3C] px-8 py-3 text-white transition hover:bg-[#6D4C41]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="overflow-hidden">
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-2 inline-block rounded-full bg-[#8B5E3C]/10 px-3 py-1 text-sm font-medium text-[#8B5E3C]">
                      {product.category}
                    </div>

                    <h3 className="line-clamp-1 text-xl font-bold text-[#3E2723]">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-2xl font-bold text-[#8B5E3C]">
                      ₹ {product.price}
                    </p>

                    <button className="mt-5 w-full rounded-xl bg-[#8B5E3C] py-3 font-semibold text-white transition hover:bg-[#6D4C41]">
                      View Details
                    </button>
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
