import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const { cart } = useCart();

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Fetch suggestions from DummyJSON
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5)); // show top 5
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuggestions();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setShowSearch(false);
      setSuggestions([]);
    }
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md relative">
      {/* Left Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold">Ecommerce</Link>
        <Link to="/shop" className="hover:underline">Shop</Link>
        <Link to="/about" className="hover:underline">About</Link>

        <Link to="/cart" className="relative flex items-center hover:underline">
          <ShoppingCart className="w-5 h-5 mr-1" />
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
{/* Center Logo */}
<Link
  to="/"
  className="absolute left-1/2 transform -translate-x-1/2"
>
  <img 
    src="/logo.png.jpg"
    alt="Sheetal's Store Logo" 
    className="h-10 w-auto object-contain" 
  />
</Link>


      {/* Right Actions */}
      <div className="flex items-center gap-4 relative">
        {/* Search Icon */}
        <button onClick={() => setShowSearch(!showSearch)}>
          <Search className="w-5 h-5" />
        </button>

        {/* Search Box */}
        {showSearch && (
          <div className="absolute top-12 right-0 bg-white text-black p-3 rounded shadow-lg w-64">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full border px-2 py-1 rounded"
              />
            </form>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <ul className="mt-2 border-t border-gray-200">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      setShowSearch(false);
                      setSuggestions([]);
                    }}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Login/Logout */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
