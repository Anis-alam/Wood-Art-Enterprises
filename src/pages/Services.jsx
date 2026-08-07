import MainLayout from "../layouts/MainLayout";
import ServiceCard from "../components/services/ServiceCard";

export default function Services() {
  const services = [
    {
      icon: "🛋️",
      title: "Custom Furniture",
      description:
        "Premium custom-made furniture designed according to your space and style.",
    },
    {
      icon: "🏠",
      title: "Home Interior",
      description:
        "Complete interior furniture solutions for homes, apartments, and villas.",
    },
    {
      icon: "🪵",
      title: "Modular Furniture",
      description:
        "Modern modular furniture for kitchens, bedrooms, and offices.",
    },
    {
      icon: "🚚",
      title: "Delivery & Installation",
      description:
        "Safe delivery and professional installation across your city.",
    },
    {
      icon: "🔨",
      title: "Repair & Maintenance",
      description:
        "Expert furniture repair, polishing, maintenance, and restoration.",
    },
    {
      icon: "🎨",
      title: "Interior Consultation",
      description:
        "Professional guidance to select the best furniture for your home.",
    },
  ];

  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-[#3E2723] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Our Services</h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            Wood Art Enterprises offers complete furniture and interior
            solutions with premium quality, elegant craftsmanship, and reliable
            customer support.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#3E2723]">Why Choose Us</h2>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            <div>
              <h3 className="text-4xl">⭐</h3>
              <h4 className="font-bold mt-3">Premium Quality</h4>
            </div>

            <div>
              <h3 className="text-4xl">🚚</h3>
              <h4 className="font-bold mt-3">Fast Delivery</h4>
            </div>

            <div>
              <h3 className="text-4xl">🛠️</h3>
              <h4 className="font-bold mt-3">Expert Craftsmanship</h4>
            </div>

            <div>
              <h3 className="text-4xl">😊</h3>
              <h4 className="font-bold mt-3">Customer Satisfaction</h4>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
