import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ServiceCard({ service, index }) {
  // Match service cards to Firebase category names
  const categoryMap = {
    "Modular Kitchen": "Kitchen",
    "Bedroom Furniture": "Bedroom",
    "Office Furniture": "Office",
    "Dining Furniture": "Dining",
    "Wooden Interior": "Interior",
    "Doors & Windows": "Doors",
  };

  const category = categoryMap[service.title] || service.title;

  return (
    <Link
      to={`/products?category=${encodeURIComponent(category)}`}
      className="block w-full max-w-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className="group flex min-h-140 flex-col overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
      >
        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          {/* Number */}
          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 font-bold text-[#8B5E3C] backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-8 text-center">
          <h3 className="text-3xl font-bold text-[#5C3A21] min-h-20 flex items-center justify-center">
            {service.title}
          </h3>

          <p className="mt-4 flex-1 text-gray-600 leading-7">
            {service.description}
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 font-semibold text-[#8B5E3C] transition-all duration-300 group-hover:gap-4">
            View Products
            <ArrowRight size={20} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ServiceCard;
