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
    fetchImages();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to the E-Commerce Store</h2>
        <p className="text-gray-600 mb-10">Browse products, add to cart, and enjoy shopping!</p>

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
      </div>
    </>
  );
};

export default Home;

