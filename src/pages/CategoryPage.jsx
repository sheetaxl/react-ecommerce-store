import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CategoryPage = () => {
  const { dispatch } = useCart(); 
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/category/${categoryName}`);
        setProducts(res.data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    alert(`"${product.title}" added to cart!`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-black text-white py-12 px-6 md:px-20">
        <h1 className="text-4xl font-bold mb-4 capitalize">Shop {categoryName.replace('-', ' ')}</h1>
        <p className="text-lg max-w-2xl">
          Revamp your style with the latest trends in {categoryName.replace('-', ' ')} clothing or achieve a perfectly curated wardrobe with timeless pieces.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-6 md:px-20 py-10">
        
        <aside className="w-full md:w-1/4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <label><input type="checkbox" defaultChecked /> Jackets</label><br />
              <label><input type="checkbox" /> Fleece</label><br />
              <label><input type="checkbox" /> Sweatshirts</label><br />
              <label><input type="checkbox" /> Shirts</label><br />
              <label><input type="checkbox" /> T-Shirts</label>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Color</h3>
            <div className="flex gap-2 flex-wrap">
              {['bg-orange-400', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-black', 'bg-white', 'bg-gray-400'].map((color, idx) => (
                <div key={idx} className={`w-6 h-6 rounded-full border ${color}`}></div>
              ))}
            </div>
          </div>
        </aside>

        
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span>Showing {products.length} Products</span>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Sort By: Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.map(product => (
    <div key={product.id} className="bg-white p-4 shadow rounded flex flex-col">
      
      
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover mb-3 rounded"
        />
        <h3 className="font-semibold text-sm">{product.title}</h3>
        <p className="text-xs text-gray-500">{product.brand}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold">${product.price}</span>
          <span className="text-sm">M</span>
        </div>
      </Link>

      
      <button
        onClick={() => handleAddToCart(product)}
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
      >
        Add to Cart
      </button>
    </div>
  ))}
</div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
