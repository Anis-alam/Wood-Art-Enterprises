import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import SEO from "../components/common/SEO";
import { addEnquiry } from "../services/enquiryService";

export default function Contact() {
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Automatically fill product enquiry
  useEffect(() => {
    if (location.state?.productName) {
      setForm((prev) => ({
        ...prev,
        message: `Hello,

I am interested in the product "${location.state.productName}".

Please contact me with more details.`,
      }));
    }
  }, [location.state]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await addEnquiry({
        ...form,
        product: location.state?.productName || "",
        createdAt: new Date(),
      });

      toast.success("Enquiry submitted successfully!");

      setForm({
        name: "",
        phone: "",
        email: "",
        city: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit enquiry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact Us | Wood Art Enterprises"
        description="Contact Wood Art Enterprises for premium wooden furniture, custom furniture solutions, quotations, and business enquiries."
        keywords="contact wood art enterprises, furniture contact, wooden furniture enquiry, furniture manufacturer Delhi"
      />

      <section className="bg-[#F8F5F0] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-[#3E2723] mb-12">
            Contact Us
          </h1>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
                Send an Enquiry
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Write your enquiry..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#8B5E3C] hover:bg-[#6D4C41] text-white py-3 rounded-xl font-semibold transition disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <iframe
                src="https://www.google.com/maps?q=H-29/42,+Behind+Ashoka+Park,+Zakir+Nagar,+Okhla,+New+Delhi,+110025&output=embed"
                className="w-full h-64 rounded-2xl shadow-lg"
                loading="lazy"
                title="Wood Art Enterprises Location"
              />

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
                  WOOD ART ENTERPRISES
                </h2>

                <p className="text-gray-600 mb-6">
                  <strong>All M.S., S.S. & Wood Work</strong>
                </p>

                <div className="space-y-5">
                  <div>
                    <h3 className="font-semibold text-lg">📍 Address</h3>

                    <p className="text-gray-600 mt-2">
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

                  <div>
                    <h3 className="font-semibold text-lg">📞 Mobile</h3>

                    <p className="text-gray-600 mt-2">
                      +91 8510935683
                      <br />
                      +91 8510930207
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">🕒 Working Hours</h3>

                    <p className="text-gray-600 mt-2">
                      Monday – Saturday
                      <br />
                      9:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=H-29/42,+Behind+Ashoka+Park,+Zakir+Nagar,+Okhla,+New+Delhi+110025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-8 bg-[#8B5E3C] hover:bg-[#6D4C41] text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  📍 Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
