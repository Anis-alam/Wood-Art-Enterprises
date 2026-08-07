import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { motion } from "framer-motion";
import { Home, Users, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";

import heroSlides from "../../assets/data/heroSlides";
import Button from "../common/Button";

function Hero() {
  return (
    <section className="relative h-screen">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/45"></div>

              <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 h-full">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] items-center h-full">
                  {/* Left Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="inline-flex bg-[#8B5E3C] text-white px-6 py-3 rounded-full font-medium">
                      ✨ {slide.subtitle}
                    </span>

                    <h1 className="mt-8 text-5xl md:text-6xl xl:text-7xl font-black leading-tight text-white max-w-3xl">
                      {slide.title}
                    </h1>

                    <p className="mt-8 max-w-xl text-lg text-gray-200 leading-8">
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-wrap gap-5">
                      <Link
                        to="/products"
                        className="inline-flex items-center justify-center bg-[#8B5E3C] hover:bg-[#6D4C41] text-white px-8 py-4 rounded-xl font-semibold transition duration-300"
                      >
                        Explore Collection
                      </Link>

                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-[#3E2723] px-8 py-4 rounded-xl font-semibold transition duration-300"
                      >
                        Free Consultation
                      </Link>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-3 mt-10">
                      <div className="flex text-yellow-400">
                        <Star fill="currentColor" />
                        <Star fill="currentColor" />
                        <Star fill="currentColor" />
                        <Star fill="currentColor" />
                      </div>

                      <span className="text-white text-lg">
                        4.5 Google Rating
                      </span>
                    </div>
                  </motion.div>

                  {/* Right Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex justify-end"
                  >
                    <div className="space-y-6 flex flex-col">
                      <StatCard
                        icon={<Home size={30} />}
                        number="950+"
                        title="Completed Projects"
                      />

                      <StatCard
                        icon={<Users size={30} />}
                        number="1200+"
                        title="Happy Clients"
                      />

                      <StatCard
                        icon={<Award size={30} />}
                        number="45+"
                        title="Years Experience"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function StatCard({ icon, number, title }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="w-80 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-7 shadow-2xl flex flex-col items-center text-center"
    >
      <div className="text-[#D4AF37] mb-5">{icon}</div>

      <h2 className="text-5xl font-bold text-white">{number}</h2>

      <p className="text-gray-200 mt-3 text-lg">{title}</p>
    </motion.div>
  );
}

export default Hero;
