import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import WhyChooseUs from "../components/home/WhyChooseUs";
import FeaturedProducts from "../components/home/FeaturedProducts";
import ProductsSection from "../components/home/ProductsSection";
import SEO from "../components/common/SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="Wood Art Enterprises | Premium Wooden Furniture Manufacturer"
        description="Discover premium wooden furniture from Wood Art Enterprises. Explore elegant sofas, beds, wardrobes, dining tables, office furniture, and custom furniture crafted with quality and style."
        keywords="wood furniture, wooden furniture, premium furniture, sofa, bed, wardrobe, dining table, office furniture, home furniture, custom furniture, Wood Art Enterprises"
      />

      <MainLayout>
        <div data-aos="fade-up">
          <Hero />
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <Services />
        </div>

        <div data-aos="fade-right" data-aos-delay="150">
          <WhyChooseUs />
        </div>

        <div data-aos="zoom-in" data-aos-delay="200">
          <FeaturedProducts />
        </div>

        <div data-aos="fade-up" data-aos-delay="250">
          <ProductsSection />
        </div>
      </MainLayout>
    </>
  );
}
