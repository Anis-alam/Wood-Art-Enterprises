import { Sofa, ShieldCheck, Clock3, BadgeCheck } from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      icon: <Sofa size={34} />,
      title: "Premium Craftsmanship",
      description:
        "Every furniture piece is handcrafted with precision using premium wood and high-quality hardware.",
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Quality Materials",
      description:
        "We use trusted brands and durable materials to ensure long-lasting furniture.",
    },
    {
      icon: <Clock3 size={34} />,
      title: "On-Time Delivery",
      description:
        "Our experienced team delivers every project within the promised timeline.",
    },
    {
      icon: <BadgeCheck size={34} />,
      title: "Customized Designs",
      description:
        "Every design is customized according to your space, lifestyle, and budget.",
    },
  ];

  return (
    <section className="bg-white py-28 w-full items-center justify-center text-center">
      <div className="max-w-375 mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Image */}

          <div className="relative top-10 items-center justify-center text-center">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
              alt="Luxury Furniture"
              className="w-full h-175 rounded-3xl object-cover shadow-2xl"
            />

            <div className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center">
              <h2 className="text-5xl font-bold text-[#8B5E3C]">45+</h2>

              <p className="mt-2 text-gray-600">Years Experience</p>
            </div>
          </div>

          {/* Right Content */}

          <div>
            <span className="uppercase tracking-[5px] text-[#8B5E3C] font-semibold">
              Why Choose Us
            </span>

            <h2 className="mt-4 text-5xl lg:text-6xl font-bold text-[#5C3A21] leading-tight">
              Crafted To Transform Every Space
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">
              Wood Art Enterprises designs luxurious modular kitchens,
              wardrobes, TV units, office furniture, bedroom furniture, and
              complete interior solutions with elegant craftsmanship.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-14 items-center justify-center text-center">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-200 p-8 hover:shadow-xl transition duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#8B5E3C]/10 flex items-center justify-center text-[#8B5E3C]">
                    {feature.icon}
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-[#5C3A21]">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-7">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
