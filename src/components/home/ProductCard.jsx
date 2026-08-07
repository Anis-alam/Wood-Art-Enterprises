import { Link } from "react-router-dom";
import LazyImage from "../common/LazyImage";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Fixed Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        <LazyImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex min-h-38 flex-col justify-between p-5">
        <div>
          <h3 className="line-clamp-2 text-xl font-bold text-[#3E2723]">
            {product.name}
          </h3>

          <p className="mt-2 text-gray-500">{product.category}</p>
        </div>

        <p className="mt-4 text-2xl font-bold text-[#8B5E3C]">
          ₹ {product.price}
        </p>
      </div>
    </Link>
  );
}
