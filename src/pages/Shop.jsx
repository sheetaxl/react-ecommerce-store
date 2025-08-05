import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=12");
      const data = await res.json();
      setProducts(data.products); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);


  return (
    <>
      

      {/* Header */}
      <div className="bg-gray-100 min-h-screen px-8 py-12">
        <div className="text-center mb-14 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Shop the Latest Trends</h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Explore our wide collection of fashionable and trending items for every style and season.
          </p>
        </div>

        {/* Dynamic Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto animate-fade-in">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/400x250?text=Image+Not+Available")
                  }
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">{product.title}</h3>
                  <p className="text-gray-500">${product.price}</p>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;


