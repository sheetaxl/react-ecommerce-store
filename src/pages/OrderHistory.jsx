import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const sortedOrders = storedOrders.sort(
      (a, b) => new Date(b.placedAt) - new Date(a.placedAt)
    );
    setOrders(sortedOrders);
  }, []);

  // Auto-update order status
  useEffect(() => {
    if (orders.length === 0) return;

    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          if (order.status === "Processing") {
            return { ...order, status: "Shipped" };
          } else if (order.status === "Shipped") {
            return {
              ...order,
              status: "Delivered",
              deliveredAt: new Date().toISOString(), // add delivered date
            };
          }
          return order;
        });

        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        return updatedOrders;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [orders]);

  // Cancel Order
  const handleCancelOrder = (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const updatedOrders = orders.filter((order) => order.id !== id);
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }
  };

  // Track Order
  const handleTrackOrder = (order) => {
    alert(
      `🚚 Tracking Order #${order.id}\nStatus: ${order.status}\nEstimated Delivery: ${order.deliveryDate}`
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-3 mb-3">
                <div>
                  <h2 className="font-semibold text-lg">
                    Order <span className="text-blue-600">#{order.id}</span>
                  </h2>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Placed On:</span>{" "}
                    {new Date(order.placedAt).toLocaleDateString()} at{" "}
                    {new Date(order.placedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {order.status === "Delivered" && order.deliveredAt ? (
                    <p className="text-sm text-green-600">
                      ✅ Delivered On:{" "}
                      {new Date(order.deliveredAt).toLocaleDateString()} at{" "}
                      {new Date(order.deliveredAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Estimated Delivery:</span>{" "}
                      {order.deliveryDate}
                    </p>
                  )}
                </div>

                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="flex items-center gap-4">
                {order.items[0] && (
                  <img
                    src={order.items[0].thumbnail}
                    alt={order.items[0].title}
                    className="w-20 h-20 object-cover rounded border"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium">
                    {order.items[0]?.title}
                    {order.items.length > 1 && (
                      <span className="text-sm text-gray-500 ml-2">
                        +{order.items.length - 1} more
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.items.length} item(s)
                  </p>
                </div>
                <p className="font-bold text-lg">₹{order.total}</p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3 flex-wrap">
                <Link
                  to={`/orders/${order.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  View Details
                </Link>
                <button
                  onClick={() => alert("Invoice Download Coming Soon 📄")}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                >
                  Download Invoice
                </button>
                {order.status !== "Delivered" ? (
                  <>
                    <button
                      onClick={() => handleTrackOrder(order)}
                      className="px-4 py-2 bg-green-100 text-green-600 rounded hover:bg-green-200 text-sm"
                    >
                      Track Order
                    </button>
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
                    >
                      Cancel Order
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
