import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import AOS from "aos";
import "aos/dist/aos.css";

import "./index.css";
import App from "./App";
import ScrollToTop from "./components/common/ScrollToTop";
import { ThemeProvider } from "./context/ThemeContext";

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 80,
  easing: "ease-in-out",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />

          <App />

          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={12}
            toastOptions={{
              duration: 3000,
              style: {
                background: "#3E2723",
                color: "#ffffff",
                borderRadius: "12px",
                fontSize: "15px",
                padding: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
