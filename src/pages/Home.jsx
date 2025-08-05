import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

const categoryToDummyJSON = {
  Women: 'womens-dresses',
  Men: 'mens-shirts',
  Accessories: 'womens-jewellery',
  Kids: 'tops',
};

const Home = () => {
  const [categoryImages, setCategoryImages] = useState({});
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = {};
      for (let [name, endpoint] of Object.entries(categoryToDummyJSON)) {
        try {
          const res = await fetch(`https://dummyjson.com/products/category/${endpoint}`);
          const json = await res.json();
          data[name] = json.products[0]?.thumbnail;
        } catch (err) {
          console.error(`Failed to load image for ${name}`, err);
        }
      }
      setCategoryImages(data);
    };

    const fetchFeatured = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products?limit=8`);
        const json = await res.json();
        setFeaturedProducts(json.products);
      } catch (err) {
        console.error('Error loading featured products', err);
      }
    };

    fetchImages();
    fetchFeatured();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="h-screen w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url("/hero.jpg")` }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded-lg text-center text-white max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">Elevate Your Style</h1>
          <p className="text-lg mb-6">
            Discover premium fashion collections crafted for trendsetters.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-black px-6 py-3 text-lg rounded hover:bg-gray-200 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Main Content */}
      
      
      <div className="p-8 relative bg-gradient-to-r from-red-50 to-black-50 py-16 px-6 text-center overflow-hidden">
        
        

<div className="max-w-3xl mx-auto animate-fade-in-up">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight hover:scale-105 transition-transform duration-300">
      Welcome to <span className="text-red-600">E-Commerce By Sheetal</span>
    </h2>
    <p className="text-lg text-gray-600 mb-8">
      Browse hand-picked collections, add your favorites to cart, and enjoy a seamless shopping experience.
    </p>

    
  </div>





        {/* Category Section */}
<section className="mt-16 px-4">
  <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
    Shop by Category
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {Object.keys(categoryToDummyJSON).map((category) => (
      <Link to={`/category/${categoryToDummyJSON[category]}`} key={category}>
        <div className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 bg-white">
          <img
            src={categoryImages[category]}
            alt={category}
            className="w-full h-60 object-cover group-hover:opacity-90 transition duration-300"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Available')}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <span className="text-white text-xl font-semibold tracking-wide">
              {category}
            </span>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>


        {/* Featured Products Section */}
<section className="mt-20 px-4">
  <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
    Featured Products
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {featuredProducts.map((product) => (
      <Link to={`/product/${product.id}`} key={product.id}>
        <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-60 object-cover group-hover:opacity-90 transition duration-300"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/400x250?text=No+Image')}
          />
          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg text-gray-800 group-hover:text-black transition">
              {product.title}
            </h3>
            <p className="text-gray-500 text-md mt-1 group-hover:text-gray-700 transition">
              ₹{product.price}
            </p>
          </div>
          {/* Optional "Quick View" Button */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300">
            <span className="inline-block bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800">
              View Details
            </span>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>

        {/* Contact Us Section */}
<section className="mt-20 py-16 px-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
  <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-10">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 animate-fade-in-up">
      Get in Touch
    </h2>
    <form className="space-y-6">
      <div className="relative group">
        <input
          type="text"
          required
          className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all peer"
          placeholder=" "
        />
        <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
          Your Name
        </label>
      </div>

      <div className="relative group">
        <input
          type="email"
          required
          className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all peer"
          placeholder=" "
        />
        <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
          Your Email
        </label>
      </div>

      <div className="relative group">
        <textarea
          rows="5"
          required
          className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all peer"
          placeholder=" "
        ></textarea>
        <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
          Your Message
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-transform duration-300 transform hover:scale-105 shadow-md"
      >
        Send Message
      </button>
    </form>
  </div>
</section>


        {/* Footer */}
        <footer className="mt-12 py-6 bg-black text-white text-center text-sm">
          © {new Date().getFullYear()} Ecommerce.BySheetal. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Home;
