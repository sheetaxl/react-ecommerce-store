import React from "react";
import Navbar from "../components/Navbar"; // adjust the path if needed

const Shop = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Our Latest Arrivals</h1>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Create screens directly in Method or add your images from Sketch or Figma. You can even sync designs from your cloud storage!
          </p>
          <button className="border px-6 py-2 rounded hover:bg-black hover:text-white transition">
            Shop All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-300 h-64 rounded shadow-md" />
          <div className="bg-gray-300 h-64 rounded shadow-md" />
          <div className="bg-gray-300 h-64 rounded shadow-md" />
        </div>
      </div>
    </>
  );
};

export default Shop;
