import services from "../../assets/data/services";
import ServiceCard from "./ServiceCard";

function Services() {
  return (
    <section className="py-28 bg-[#faf7f2]">
      <div className="max-w-375 mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div
          data-aos="fade-up"
          className="w-full flex flex-col items-center justify-center text-center mb-20"
        >
          <span className="uppercase tracking-[6px] text-[#8B5E3C] font-semibold text-sm">
            OUR SERVICES
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#5C3A21] max-w-5xl">
            Premium Furniture
            <br />
            Solutions
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            We design elegant furniture and interior solutions tailored to your
            home, office, and lifestyle with premium craftsmanship.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-aos="flip-left"
              data-aos-delay={index * 100}
              className="w-full flex justify-center"
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
