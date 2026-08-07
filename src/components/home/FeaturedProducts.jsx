import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { getFeaturedProducts } from "../../services/productService";
import LazyImage from "../common/LazyImage";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getFeaturedProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <section className="py-20 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div data-aos="fade-up">
          <h2 className="text-4xl font-bold text-center text-[#3E2723]">
            Featured Products
          </h2>

          <p className="text-center text-gray-500 mt-4 mb-12">
            Discover our handpicked premium furniture collection.
          </p>
        </div>

        {/* Products */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <LazyImage
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-[#3E2723]">
                  {product.name}
                </h3>

                <p className="text-gray-500 mt-2">{product.category}</p>

                <p className="text-[#8B5E3C] font-bold text-xl mt-3">
                  ₹ {product.price}
                </p>

                <div className="mt-5 flex items-center text-[#8B5E3C] font-semibold">
                  View Details
                  <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
