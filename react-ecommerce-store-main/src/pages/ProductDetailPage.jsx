import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { dispatch } = useCart();

  // States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Increase & Decrease quantity
  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));

  // Handle Add to Cart
  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
  };

  // Show error if API fails
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  // Show skeleton loader while fetching
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image skeletons */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-48 rounded-lg" />
          ))}
        </div>

        {/* Product details skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" /> {/* title */}
          <Skeleton className="h-6 w-1/4" /> {/* price */}
          <Skeleton className="h-20 w-full" /> {/* description */}
          <Skeleton className="h-10 w-1/3" /> {/* size buttons */}
          <Skeleton className="h-12 w-2/3" /> {/* add to cart button */}
        </div>
      </div>
    );
  }

  // Render product details
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="grid grid-cols-2 gap-4">
        {product.images?.slice(0, 4).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={product.title}
            className="object-cover w-full h-48 rounded-lg shadow"
          />
        ))}
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-xl text-gray-700">₹{product.price}</p>
        <p className="text-gray-600">{product.description}</p>

        {/* Sizes */}
        <div>
          <p className="font-semibold">Size</p>
          <div className="flex gap-2 mt-1">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className="border px-3 py-1 rounded hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mt-4">
          <span className="font-medium">Quantity:</span>
          <div className="flex border rounded">
            <button onClick={decreaseQty} className="px-3 py-1">
              −
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button onClick={increaseQty} className="px-3 py-1">
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-6 py-3 rounded-lg mt-6 hover:bg-gray-800 transition"
        >
          Add to Cart - ₹{product.price * quantity}
        </button>

        {/* Extra Info */}
        <div className="text-sm text-gray-500 mt-2">
          <p>Free standard shipping</p>
          <p>Free returns</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

