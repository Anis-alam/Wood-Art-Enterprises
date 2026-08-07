import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import Loader from "./components/loading/Loader";
import WhatsAppButton from "./components/floating/WhatsAppButton";
import BackToTop from "./components/floating/BackToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import Categories from "./pages/Categories";
import Customers from "./pages/Customers";
import Enquiries from "./pages/Enquiries";
import Settings from "./pages/Settings";
import EditProduct from "./pages/EditProduct";

import NotFound from "./pages/NotFound";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/services" element={<Services />} />

        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="add-product" element={<AddProduct />} />

          <Route path="products" element={<ManageProducts />} />

          <Route path="categories" element={<Categories />} />

          <Route path="customers" element={<Customers />} />

          <Route path="enquiries" element={<Enquiries />} />

          <Route path="settings" element={<Settings />} />

          <Route path="edit/:id" element={<EditProduct />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
