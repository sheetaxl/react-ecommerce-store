// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import SearchResultsPage from "./pages/SearchResultsPage";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import ProductsPage from "./pages/ProductsPage";
import NotFound from "./pages/NotFound";

// Utils
import PrivateRoute from "./utils/PrivateRoute";

/**
 * App Component
 * - Defines all routes in the application
 * - Wraps protected routes with <PrivateRoute>
 * - Global Navbar + Scroll restoration
 */
function App() {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Scroll reset when navigating */}
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/products" element={<ProductsPage />} />

        {/* Protected Routes (Require Login) */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />

        {/* Order Routes */}
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:id" element={<OrderDetail />} />

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

