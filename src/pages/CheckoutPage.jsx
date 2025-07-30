import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, totalPrice, dispatch } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    payment: 'cod',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (!form.name || !form.email || !form.address || !form.phone) {
      alert('Please fill all required fields.');
      return;
    }

    
    alert('✅ Order placed successfully!');
    dispatch({ type: 'CLEAR_CART' });
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🧾 Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border px-4 py-2 rounded"
            />
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              className="w-full border px-4 py-2 rounded"
              rows="4"
            ></textarea>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="card">Credit/Debit Card</option>
            </select>
          </div>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="border p-4 rounded space-y-4 bg-gray-50">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <p>{item.title} × {item.quantity}</p>
                <p>₹{item.price * item.quantity}</p>
              </div>
            ))}
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>₹{totalPrice}</p>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
