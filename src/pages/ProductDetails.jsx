import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";
import SEO from "../components/common/SEO";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-semibold text-[#3E2723]">
        Loading Product...
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${product.name} | Wood Art Enterprises`}
        description={
          product.description ||
          `${product.name} - Premium handcrafted wooden furniture from Wood Art Enterprises.`
        }
        keywords={`${product.name}, ${product.category}, wooden furniture, premium furniture, Wood Art Enterprises`}
        image={product.image}
      />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <span className="inline-block bg-[#8B5E3C] text-white px-4 py-2 rounded-full text-sm mb-5">
              {product.category}
            </span>

            <h1 className="text-4xl font-bold text-[#3E2723]">
              {product.name}
            </h1>

            <h2 className="mt-6 text-3xl font-bold text-[#8B5E3C]">
              ₹ {product.price}
            </h2>

            <div className="mt-10 space-y-5">
              <p>
                <span className="font-semibold">Material :</span>{" "}
                {product.material || "-"}
              </p>

              <p>
                <span className="font-semibold">Dimensions :</span>{" "}
                {product.dimensions || "-"}
              </p>

              <div>
                <h3 className="text-xl font-semibold mb-3">Description</h3>

                <p className="leading-8 text-gray-600">
                  {product.description || "No description available."}
                </p>
              </div>
            </div>

            {/* Enquiry Button */}
            <button
              onClick={() =>
                navigate("/contact", {
                  state: {
                    productName: product.name,
                  },
                })
              }
              className="mt-10 rounded-xl bg-[#8B5E3C] px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-[#6D4C41]"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
