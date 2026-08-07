import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  // Replace with your client's WhatsApp number
  const phone = "918510935683";

  const message = encodeURIComponent(
    "Hello, I'm interested in your furniture products. Can you provide more information?",
  );

  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative group">
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40"></span>

        {/* Button */}
        <div className="relative w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl flex items-center justify-center text-white transition">
          <MessageCircle size={32} />
        </div>

        {/* Tooltip */}
        <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-sm text-white opacity-0 group-hover:opacity-100 transition">
          Chat on WhatsApp
        </div>
      </div>
    </motion.a>
  );
}
