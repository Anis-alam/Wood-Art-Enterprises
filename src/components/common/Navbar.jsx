import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scroll ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-360    mx-auto px-6 lg:px-10">
          <div className="h-24 flex items-center justify-between">
            {/* Logo */}
            <Logo dark={scrolled} />

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-semibold transition duration-300 ${
                    scroll
                      ? "text-gray-800 hover:text-[#8B5E3C]"
                      : "text-white hover:text-amber-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+918510935683"
                className="flex items-center gap-2 text-center bg-green-600 hover:bg-green-700 text-white px-6 h-12 rounded-xl transition"
              >
                <Phone size={18} />
                Call Now
              </a>

              <Link
                to="/login"
                className="bg-[#8B5E3C] hover:bg-[#6b4326] text-white px-6 h-12 rounded-xl flex items-center transition"
              >
                Admin
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden ${scrolled ? "text-black" : "text-white"}`}
            >
              <Menu size={32} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <Logo dark={true} />

          <button onClick={() => setMobileOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="text-lg font-semibold text-gray-700 hover:text-amber-600"
            >
              {item.name}
            </Link>
          ))}

          <a
            href="tel:+918510935683"
            className={`h-12 px-7 rounded-xl flex items-center gap-2 transition ${
              scroll ? "bg-green-600 text-white" : "bg-white text-green-700"
            }`}
          >
            📞 Call Now
          </a>

          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className={`h-12 px-8 rounded-xl flex items-center justify-center transition ${
              scroll ? "bg-[#8B5E3C] text-white" : "bg-white text-[#8B5E3C]"
            }`}
          >
            Admin Login
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
