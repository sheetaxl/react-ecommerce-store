import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Skeleton } from "@/components/ui/skeleton"; 

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

   
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-48 rounded-lg" />
          ))}
        </div>

        
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />   {/* title */}
          <Skeleton className="h-6 w-1/4" />   {/* price */}
          <Skeleton className="h-20 w-full" /> {/* description */}
          <Skeleton className="h-10 w-1/3" />  {/* size buttons */}
          <Skeleton className="h-12 w-2/3" />  {/* add to cart button */}
        </div>
      </div>
    );
  }

  
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      
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

      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-xl text-gray-700">₹{product.price}</p>
        <p className="text-gray-600">{product.description}</p>

        
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

        
        <div className="flex items-center gap-2 mt-4">
          <span className="font-medium">Quantity:</span>
          <div className="flex border rounded">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1"
            >
              −
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1"
            >
              +
            </button>
          </div>
        </div>

        
        <button
          onClick={() =>
            dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } })
          }
          className="bg-black text-white px-6 py-3 rounded-lg mt-6 hover:bg-gray-800 transition"
        >
          Add to Cart - ₹{product.price * quantity}
        </button>

        
        <div className="text-sm text-gray-500 mt-2">
          <p>Free standard shipping</p>
          <p>Free returns</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
