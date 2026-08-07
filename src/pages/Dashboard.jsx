import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Package,
  FolderOpen,
  Star,
  MessageSquare,
  TrendingUp,
  Clock3,
} from "lucide-react";

import { getProducts } from "../services/productService";
import { getEnquiries } from "../services/enquiryService";

import DashboardCharts from "../components/admin/DashboardCharts";
import LazyImage from "../components/common/LazyImage";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  // Optimized data loading
  const loadDashboard = useCallback(async () => {
    try {
      const [productData, enquiryData] = await Promise.all([
        getProducts(),
        getEnquiries(),
      ]);

      setProducts(productData);
      setEnquiries(enquiryData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // Optimized statistics
  const { totalProducts, totalCategories, featuredProducts, totalEnquiries } =
    useMemo(() => {
      return {
        totalProducts: products.length,
        totalCategories: new Set(products.map((item) => item.category)).size,
        featuredProducts: products.filter((item) => item.featured).length,
        totalEnquiries: enquiries.length,
      };
    }, [products, enquiries]);

  // Optimized cards
  const cards = useMemo(
    () => [
      {
        title: "Total Products",
        value: totalProducts,
        icon: Package,
        color: "bg-blue-100 text-blue-600",
      },
      {
        title: "Categories",
        value: totalCategories,
        icon: FolderOpen,
        color: "bg-green-100 text-green-600",
      },
      {
        title: "Featured Products",
        value: featuredProducts,
        icon: Star,
        color: "bg-yellow-100 text-yellow-600",
      },
      {
        title: "Total Enquiries",
        value: totalEnquiries,
        icon: MessageSquare,
        color: "bg-red-100 text-red-600",
      },
    ],
    [totalProducts, totalCategories, featuredProducts, totalEnquiries],
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#3E2723]">Welcome Back 👋</h1>

        <p className="text-gray-500 mt-2">Wood Art Enterprises Dashboard</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{card.title}</p>

                <h2 className="text-3xl font-bold mt-3">{card.value}</h2>
              </div>

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${card.color}`}
              >
                <card.icon size={30} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <DashboardCharts
        totalProducts={totalProducts}
        totalCategories={totalCategories}
        featuredProducts={featuredProducts}
        totalEnquiries={totalEnquiries}
      />

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        {/* Recent Products */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Recently Added Products</h2>

          {products.length === 0 ? (
            <p className="text-gray-500">No products uploaded yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="border rounded-2xl overflow-hidden hover:shadow-xl transition"
                >
                  <LazyImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="font-bold text-lg">{product.name}</h3>

                    <p className="text-gray-500 mt-1">{product.category}</p>

                    <p className="text-[#8B5E3C] font-bold text-xl mt-3">
                      ₹ {product.price}
                    </p>

                    {product.featured && (
                      <span className="inline-block mt-4 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Package className="text-blue-600" />
              <div>
                <p className="font-semibold">Products Added</p>
                <span className="text-gray-500 text-sm">
                  {totalProducts} Products
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="text-red-500" />
              <div>
                <p className="font-semibold">Customer Enquiries</p>
                <span className="text-gray-500 text-sm">
                  {totalEnquiries} Received
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <TrendingUp className="text-green-600" />
              <div>
                <p className="font-semibold">Featured Products</p>
                <span className="text-gray-500 text-sm">
                  {featuredProducts} Featured
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock3 className="text-purple-600" />
              <div>
                <p className="font-semibold">Categories</p>
                <span className="text-gray-500 text-sm">
                  {totalCategories} Categories
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
