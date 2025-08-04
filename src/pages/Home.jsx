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
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to the E-Commerce Store</h2>
        <p className="text-gray-600 mb-10">Browse products, add to cart, and enjoy shopping!</p>

        {/* Category Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {Object.keys(categoryToDummyJSON).map((category) => (
            <Link to={`/category/${categoryToDummyJSON[category]}`} key={category}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition cursor-pointer">
                <img
                  src={categoryImages[category]}
                  alt={category}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Available')}
                />
                <div className="p-4 text-lg font-semibold text-center">
                  {category}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Products Section */}
        <h2 className="text-xl font-bold mt-20 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {featuredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/400x250?text=No+Image')}
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-gray-500">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Us Section */}
        <div className="mt-20 bg-gray-100 py-12 px-6 max-w-4xl mx-auto rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded focus:outline-none"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 border rounded focus:outline-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-12 py-6 bg-black text-white text-center text-sm">
          © {new Date().getFullYear()} Ecommerce.BySheetal. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Home;
