import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import ProductCard from "./ProductCard";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <section className="py-24 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div data-aos="fade-up" className="text-center mb-16">
          <span className="uppercase tracking-[6px] text-[#8B5E3C] font-semibold text-sm">
            OUR COLLECTION
          </span>

          <h2 className="text-5xl font-bold text-[#3E2723] mt-4">
            Our Products
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Premium handcrafted furniture collection
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
