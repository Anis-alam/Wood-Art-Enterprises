import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  // Client's WhatsApp number
  const phone = "+918510935683";

  const message = encodeURIComponent(
    "Hello, I'm interested in your furniture products. Can you provide more information?",
  );

  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group fixed bottom-5 right-6 z-50"
    >
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping" />

      {/* WhatsApp Button */}
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-colors duration-300 hover:bg-green-600">
        <MessageCircle size={22} strokeWidth={2} />
      </div>

      {/* Tooltip */}
      <div className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Chat on WhatsApp
      </div>
    </motion.a>
  );
}
