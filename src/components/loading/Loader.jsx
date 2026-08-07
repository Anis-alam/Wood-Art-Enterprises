import { motion } from "framer-motion";
import { Hammer, Trees } from "lucide-react";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 bg-linear-to-br from-[#2B1B12] via-[#3E2723] to-[#5D4037] flex items-center justify-center"
    >
      {/* Background Glow */}
      <div className="absolute w-500px h-500px rounded-full bg-[#D4AF37]/10 blur-3xl animate-pulse"></div>

      <div className="relative text-center">
        {/* Logo Circle */}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
          }}
          className="w-32 h-32 rounded-full bg-[#D4AF37] mx-auto flex items-center justify-center shadow-2xl"
        >
          <Trees size={60} className="text-[#2B1B12]" />
        </motion.div>

        {/* Company Name */}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          className="mt-10 text-5xl font-black tracking-wide text-[#D4AF37]"
        >
          WOOD ART
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
          }}
          className="text-3xl font-bold text-white mt-2"
        >
          ENTERPRISES
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.9,
          }}
          className="text-gray-300 mt-4 tracking-[4px]"
        >
          ALL M.S. • S.S. • WOOD WORK
        </motion.p>

        {/* Loading Animation */}

        <div className="mt-12 flex justify-center gap-4">
          {[0, 1, 2].map((item) => (
            <motion.div
              key={item}
              animate={{
                y: [0, -18, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: item * 0.2,
              }}
              className="w-5 h-5 rounded-full bg-[#D4AF37]"
            />
          ))}
        </div>

        {/* Craftsmanship */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
          className="mt-10 flex justify-center"
        >
          <Hammer size={32} className="text-[#D4AF37]" />
        </motion.div>

        <p className="text-gray-400 mt-6">Crafting Premium Furniture...</p>
      </div>
    </motion.div>
  );
}
