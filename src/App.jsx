import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PrivateRoute from './utils/PrivateRoute';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import NotFound from './pages/NotFound'; 
import ProductDetailPage from "./pages/ProductDetail";
function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />

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

          
          <Route path="*" element={<NotFound />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
