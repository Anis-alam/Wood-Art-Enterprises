import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { doc, getDoc, collection, getDocs } from "firebase/firestore";

import {
  ChevronRight,
  Truck,
  ShieldCheck,
  BadgeCheck,
  MessageCircle,
  Phone,
} from "lucide-react";

import { db } from "../firebase/firebase";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import SEO from "../components/common/SEO";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      const docRef = doc(db, "products", id);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return;

      const currentProduct = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      setProduct(currentProduct);

      const snapshot = await getDocs(collection(db, "products"));

      const related = [];

      snapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };

        if (
          data.category === currentProduct.category &&
          data.id !== currentProduct.id
        ) {
          related.push(data);
        }
      });

      setRelatedProducts(related.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto rounded-full border-4 border-[#8B5E3C] border-t-transparent animate-spin"></div>

            <p className="mt-6 text-lg text-gray-600">Loading Product...</p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <SEO
        title={`${product.name} | Wood Art Enterprises`}
        description={product.description || `${product.name} Premium Furniture`}
        keywords={`${product.name}, ${product.category}`}
        image={product.image}
      />

      <section className="bg-[#faf7f2] py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}

          <div className="flex items-center text-gray-500 text-sm mb-8">
            <Link to="/" className="hover:text-[#8B5E3C]">
              Home
            </Link>

            <ChevronRight size={16} className="mx-2" />

            <Link to="/products" className="hover:text-[#8B5E3C]">
              Products
            </Link>

            <ChevronRight size={16} className="mx-2" />

            <span className="font-semibold text-[#8B5E3C]">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Product Image */}

            <div className="space-y-5">
              <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-137.5 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Small Features */}

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white p-5 text-center shadow">
                  <Truck size={28} className="mx-auto text-[#8B5E3C]" />

                  <p className="mt-3 text-sm font-semibold">Free Delivery</p>
                </div>

                <div className="rounded-2xl bg-white p-5 text-center shadow">
                  <ShieldCheck size={28} className="mx-auto text-[#8B5E3C]" />

                  <p className="mt-3 text-sm font-semibold">Warranty</p>
                </div>

                <div className="rounded-2xl bg-white p-5 text-center shadow">
                  <BadgeCheck size={28} className="mx-auto text-[#8B5E3C]" />

                  <p className="mt-3 text-sm font-semibold">Premium</p>
                </div>
              </div>
            </div>

            {/* Product Details */}

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <span className="inline-block rounded-full bg-[#8B5E3C] px-4 py-2 text-sm font-medium text-white">
                {product.category}
              </span>

              <h1 className="mt-5 text-4xl font-bold text-[#3E2723]">
                {product.name}
              </h1>

              {/* Rating */}

              <div className="mt-4 flex items-center gap-2">
                <span className="text-xl text-yellow-500">⭐⭐⭐⭐</span>

                <span className="text-gray-500">(4 Rating)</span>
              </div>

              {/* Price */}

              <h2 className="mt-6 text-4xl font-bold text-[#8B5E3C]">
                ₹ {product.price}
              </h2>

              {/* Stock */}

              <div className="mt-6">
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  ✔ In Stock
                </span>
              </div>

              {/* Product Information */}

              <div className="mt-8 grid grid-cols-2 gap-5">
                <div className="rounded-2xl bg-[#faf7f2] p-5">
                  <p className="text-sm text-gray-500">Material</p>

                  <h3 className="mt-2 font-semibold text-[#3E2723]">
                    {product.material || "Premium Wood"}
                  </h3>
                </div>

                <div className="rounded-2xl bg-[#faf7f2] p-5">
                  <p className="text-sm text-gray-500">Dimensions</p>

                  <h3 className="mt-2 font-semibold text-[#3E2723]">
                    {product.dimensions || "-"}
                  </h3>
                </div>

                <div className="rounded-2xl bg-[#faf7f2] p-5">
                  <p className="text-sm text-gray-500">Delivery</p>

                  <h3 className="mt-2 font-semibold text-[#3E2723]">
                    5-7 Days
                  </h3>
                </div>

                <div className="rounded-2xl bg-[#faf7f2] p-5">
                  <p className="text-sm text-gray-500">Warranty</p>

                  <h3 className="mt-2 font-semibold text-[#3E2723]">5 Years</h3>
                </div>
              </div>

              {/* Description */}

              <div className="mt-10">
                <h3 className="mb-4 text-2xl font-bold text-[#3E2723]">
                  Description
                </h3>

                <p className="leading-8 text-gray-600">
                  {product.description ||
                    "Premium handcrafted furniture made with high-quality wood and elegant finishing."}
                </p>
              </div>
              {/* Why Choose This Product */}

              <div className="mt-10 rounded-3xl border border-[#eadbc8] bg-[#faf7f2] p-6">
                <h3 className="mb-5 text-2xl font-bold text-[#3E2723]">
                  Why Choose This Product?
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
                    <Truck size={24} className="text-[#8B5E3C]" />

                    <span className="font-medium">Free Delivery</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
                    <ShieldCheck size={24} className="text-[#8B5E3C]" />

                    <span className="font-medium">5 Year Warranty</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
                    <BadgeCheck size={24} className="text-[#8B5E3C]" />

                    <span className="font-medium">Premium Quality</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
                    <MessageCircle size={24} className="text-[#8B5E3C]" />

                    <span className="font-medium">Custom Furniture</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}

              <div className="mt-10 space-y-4">
                {/* Enquiry */}

                <button
                  onClick={() =>
                    navigate("/contact", {
                      state: {
                        productName: product.name,
                      },
                    })
                  }
                  className="w-full rounded-xl bg-[#8B5E3C] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#6D4C41]"
                >
                  Enquire Now
                </button>

                {/* WhatsApp */}

                <a
                  href={`https://wa.me/8510935683?text=Hi, I am interested in ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
                >
                  <MessageCircle size={22} />
                  WhatsApp Now
                </a>

                {/* Call */}

                <a
                  href="tel:+918510935683"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#8B5E3C] px-8 py-4 font-semibold text-[#8B5E3C] transition hover:bg-[#8B5E3C] hover:text-white"
                >
                  <Phone size={22} />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Related Products */}

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-[#3E2723]">
              Related Products
            </h2>

            <Link
              to="/products"
              className="font-semibold text-[#8B5E3C] hover:underline"
            >
              View All →
            </Link>
          </div>

          {relatedProducts.length === 0 ? (
            <div className="rounded-3xl bg-[#faf7f2] py-16 text-center shadow">
              <h3 className="text-2xl font-semibold text-[#3E2723]">
                No Related Products Found
              </h3>

              <p className="mt-3 text-gray-500">
                More products will be added soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-5">
                    <span className="rounded-full bg-[#8B5E3C]/10 px-3 py-1 text-xs font-medium text-[#8B5E3C]">
                      {item.category}
                    </span>

                    <h3 className="mt-3 line-clamp-1 text-xl font-bold text-[#3E2723]">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-2xl font-bold text-[#8B5E3C]">
                      ₹ {item.price}
                    </p>

                    <button className="mt-5 w-full rounded-xl bg-[#8B5E3C] py-3 font-semibold text-white transition hover:bg-[#6D4C41]">
                      View Details
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}

      <Footer />
    </>
  );
}
