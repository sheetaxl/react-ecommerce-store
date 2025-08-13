import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <>
      <Navbar /> {/* ✅ Always visible on all pages */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchResultsPage />} /> 

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

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
