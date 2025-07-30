import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const categories = [
    {
      name: 'Women',
      image: 'https://via.placeholder.com/400x250?text=Women',
      path: 'womens-dresses', 
    },
    {
      name: 'Men',
      image: 'https://via.placeholder.com/400x250?text=Men',
      path: 'mens-shirts',
    },
    {
      name: 'Accessories',
      image: 'https://via.placeholder.com/400x250?text=Accessories',
      path: 'womens-jewellery',
    },
    {
      name: 'Kids',
      image: 'https://via.placeholder.com/400x250?text=Kids',
      path: 'tops', 
    },
  ];

  return (
    <>
      <Navbar />
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to the E-Commerce Store</h2>
        <p className="text-gray-600 mb-10">Browse products, add to cart, and enjoy shopping!</p>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link to={`/category/${category.path}`} key={category.name}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition cursor-pointer">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4 text-lg font-semibold text-center">
                  {category.name}
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
