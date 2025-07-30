import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, dispatch, totalPrice } = useCart();
  const navigate = useNavigate();

  const increment = (id) => dispatch({ type: 'INCREMENT', payload: id });
  const decrement = (id) => dispatch({ type: 'DECREMENT', payload: id });
  const remove = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });

  const handleCheckout = () => {
    navigate('/checkout');
  };

  
  const computedTotal = totalPrice ?? cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.thumbnail}
                    onError={(e) => (e.target.src = '/fallback.jpg')}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-sm text-gray-600">₹{item.price} per item</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-x-4 mt-4 sm:mt-0">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => decrement(item.id)}
                      className="px-2 py-1 text-xl"
                    >
                      −
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.id)}
                      className="px-2 py-1 text-xl"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-md font-medium">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right border-t pt-4">
            <p className="text-xl font-bold">Total: ₹{computedTotal}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
