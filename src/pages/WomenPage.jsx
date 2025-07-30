import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const WomenPage = () => {
  const [products, setProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category/womens-dresses');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching women products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setAddingToCart(product.id);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setTimeout(() => setAddingToCart(null), 500);
    alert(`${product.title} added to cart!`);
  };

  return (
    <>
      <Navbar />
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Women's Collection</h2>
        <p className="text-gray-600 mb-8">Shop the latest trends in women's fashion</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                </div>
              </Link>
              <div className="px-4 pb-4 mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
                  disabled={addingToCart === product.id}
                >
                  {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WomenPage;
