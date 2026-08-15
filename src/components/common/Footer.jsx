import { Phone, MapPin, Mail, Clock } from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#2B1B12] text-white mt-20">
      {/* Top Footer */}

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company */}

          <div>
            <h2 className="text-4xl font-bold text-[#D4AF37]">WOOD ART</h2>

            <h3 className="text-2xl font-semibold mb-5">ENTERPRISES</h3>

            <p className="text-[#D4AF37] font-semibold mb-4">
              ALL M.S., S.S. & WOOD WORK
            </p>

            <p className="text-gray-300 leading-8">
              We specialize in premium furniture, stainless steel fabrication,
              modular furniture, custom wood work, interior design, and
              commercial furniture solutions.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>

            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-[#D4AF37] transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-[#D4AF37] transition"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="hover:text-[#D4AF37] transition"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-[#D4AF37] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>

            <div className="space-y-5">
              <div className="flex gap-3">
                <Phone className="text-[#D4AF37]" />

                <div>
                  <a href="tel:+918510935683" className="hover:text-[#D4AF37]">
                    +91 8510935683
                  </a>

                  <br />

                  <a href="tel:+918510930207" className="hover:text-[#D4AF37]">
                    +91 8510930207
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="text-[#D4AF37]" />

                <a
                  href="mailto:info@woodartenterprises.com"
                  className="hover:text-[#D4AF37]"
                >
                  info@woodartenterprises.com
                </a>
              </div>

              <div className="flex gap-3">
                <Clock className="text-[#D4AF37]" />

                <div>
                  Monday - Saturday
                  <br />
                  9:00 AM - 7:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Address */}

          <div>
            <h3 className="text-2xl font-semibold mb-6">Address</h3>

            <div className="flex gap-3">
              <MapPin className="text-[#D4AF37] mt-1" />

              <p className="leading-8">
                H-29/42,
                <br />
                Behind Ashoka Park,
                <br />
                Zakir Nagar,
                <br />
                Okhla,
                <br />
                New Delhi - 110025
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=H-29/42,+Behind+Ashoka+Park,+Zakir+Nagar,+Okhla,+New+Delhi+110025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-[#8B5E3C] hover:bg-[#A47148] px-6 py-3 rounded-lg transition"
            >
              📍 View on Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row justify-between items-center gap-6">
          <a
            href="https://anis-alam-portfolio.netlify.app/"
            className="text-gray-400 text-center"
          >
            Developed by Anis
          </a>
          <p className="text-gray-400 text-center">
            © 2026 WOOD ART ENTERPRISES. All Rights Reserved.
          </p>

          {/* Social */}

          <div className="flex items-center gap-5">
            <a
              href="https://wa.me/918510935683"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center transition"
            >
              <FaWhatsapp size={22} />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="https://www.instagram.com/wood_artofficial?utm_source=qr&igsh=MTRmdGI0NzRidGVzaQ%3D%3D"
              className="w-11 h-11 rounded-full bg-pink-600 hover:bg-pink-700 flex items-center justify-center transition"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition"
            >
              <FaYoutube size={20} />
            </a>
          </div>

          {/* Back To Top */}
        </div>
      </div>
    </footer>
  );
}
