import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#2B1B12] via-[#3E2723] to-[#5D4037] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center"
      >
        {/* 404 */}
        <motion.h1
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="text-9xl font-black text-[#D4AF37]"
        >
          404
        </motion.h1>

        {/* Heading */}
        <h2 className="text-5xl font-bold text-white mt-6">Page Not Found</h2>

        {/* Description */}
        <p className="text-gray-300 mt-6 text-lg leading-8">
          Sorry! The page you're looking for doesn't exist, has been removed, or
          the URL is incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Link
            to="/"
            className="bg-[#D4AF37] hover:bg-yellow-500 text-[#2B1B12] px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition"
          >
            <Home size={22} />
            Back Home
          </Link>

          <Link
            to="/products"
            className="border border-white text-white hover:bg-white hover:text-[#2B1B12] px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition"
          >
            <PackageSearch size={22} />
            Browse Products
          </Link>
        </div>

        {/* Logo */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="mt-16 text-7xl"
        >
          🪵
        </motion.div>

        {/* Footer */}
        <p className="text-gray-400 mt-8">
          <strong>WOOD ART ENTERPRISES</strong>
          <br />
          ALL M.S. • S.S. • WOOD WORK
        </p>
      </motion.div>
    </div>
  );
}
