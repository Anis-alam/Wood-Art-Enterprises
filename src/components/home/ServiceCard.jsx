import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-72">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Number */}
        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[#8B5E3C] font-bold">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 items-center justify-center text-center">
        <h3 className="text-3xl font-bold text-[#5C3A21]">{service.title}</h3>

        <p className="mt-5 text-gray-600 leading-7">{service.description}</p>
        <br />
      </div>
    </motion.div>
  );
}

export default ServiceCard;
