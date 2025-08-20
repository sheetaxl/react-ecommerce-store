import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import Login from './pages/Login';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PrivateRoute from './utils/PrivateRoute';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import SearchResultsPage from './pages/SearchResultsPage';
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <>
      <Navbar />
      
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/products" element={<ProductsPage />} />

        {/* Protected Routes */}
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

        
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:id" element={<OrderDetail />} />

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
