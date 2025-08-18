import React from "react";
import { useParams, Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const OrderDetail = () => {
  const { id } = useParams();
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const order = orders.find((o) => o.id === Number(id));

  if (!order) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">❌ Order not found</h2>
        <Link to="/orders" className="text-blue-600 hover:underline">
          ← Go Back
        </Link>
      </div>
    );
  }

  // ✅ Generate Invoice PDF
  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Shop Name / Logo Header
    doc.setFontSize(18);
    doc.text("🛍️ MyShop Online Store", 14, 20);

    doc.setFontSize(12);
    doc.text(`Invoice for Order #${order.id}`, 14, 30);
    doc.text(`Status: ${order.status}`, 14, 38);
    doc.text(`Estimated Delivery: ${order.deliveryDate}`, 14, 46);

    // Customer Info
    doc.text("Customer:", 14, 58);
    doc.text("John Doe", 14, 64);
    doc.text("123 MG Road, Gurugram, Haryana", 14, 70);
    doc.text("Phone: +91-9876543210", 14, 76);

    // Payment Info
    doc.text("Payment: Credit Card (**** 5678)", 14, 88);
    doc.text("Paid Successfully ✅", 14, 94);

    // Table for Items
    const tableColumn = ["Item", "Qty", "Price", "Subtotal"];
    const tableRows = [];

    order.items.forEach((item) => {
      const itemData = [
        item.title,
        item.quantity,
        `₹${item.price}`,
        `₹${(item.price * item.quantity).toFixed(2)}`,
      ];
      tableRows.push(itemData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 110,
    });

    // Total
    doc.text(`Total Amount: ₹${order.total}`, 14, doc.lastAutoTable.finalY + 10);

    // Save PDF
    doc.save(`Invoice_Order_${order.id}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Order Details</h2>

      {/* Order Summary */}
      <div className="border rounded p-4 mb-6 bg-white shadow">
        <p>
          <strong>Order ID:</strong> #{order.id}
        </p>
        <p>
          <strong>Total Items:</strong> {order.items.length}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{order.total}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-600"
                : order.status === "Shipped"
                ? "bg-blue-100 text-blue-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {order.status}
          </span>
        </p>
        <p>
          <strong>Estimated Delivery:</strong> {order.deliveryDate}
        </p>
      </div>

      {/* Fake Delivery + Payment Info */}
      <div className="border rounded p-4 mb-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">🚚 Delivery Information</h3>
        <p>John Doe</p>
        <p>123 MG Road, Gurugram, Haryana</p>
        <p>Phone: +91-9876543210</p>

        <h3 className="text-lg font-semibold mt-4 mb-2">💳 Payment Method</h3>
        <p>Credit Card (**** 5678)</p>
        <p>Paid Successfully ✅</p>
      </div>

      {/* Items List */}
      <h3 className="text-xl font-semibold mb-2">🛒 Items in this Order</h3>
      <ul className="space-y-3">
        {order.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center border p-3 rounded bg-white shadow-sm"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover rounded mr-4"
            />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
              <p className="font-medium text-gray-700">
                Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Download Invoice Button */}
      <button
        onClick={downloadInvoice}
        className="mt-6 mr-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        📑 Download Invoice (PDF)
      </button>

      {/* Back Button */}
      <Link
        to="/orders"
        className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Back to Orders
      </Link>
    </div>
  );
};

export default OrderDetail;
