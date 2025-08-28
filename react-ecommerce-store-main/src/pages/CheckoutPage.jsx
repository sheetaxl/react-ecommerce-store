import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const totalPrice = storedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, []);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // ✅ Always create numeric order ID
    const newOrder = {
      id: Date.now(), // numeric unique ID
      items: cart,
      total,
      placedAt: new Date().toISOString(),
      deliveryDate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toDateString(),
      status: "Pending",
    };

    // ✅ Save to localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    storedOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(storedOrders));

    // ✅ Clear cart
    localStorage.removeItem("cart");
    setCart([]);
    setTotal(0);

    alert("✅ Order placed successfully!");
    navigate("/orders"); // go to order history
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3 mb-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  ₹{item.price * item.quantity}
                </p>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mb-4">Total: ₹{total}</h2>

          <button
            onClick={handlePlaceOrder}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
