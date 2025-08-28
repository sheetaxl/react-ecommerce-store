import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const [showMessage, setShowMessage] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewImage, setReviewImage] = useState('');
  const [rating, setRating] = useState(0);

  //  Fetch product
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(error => console.error("Error fetching product:", error));
  }, [productId]);

  // Handle Image Upload from Gallery
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  //  Load reviews from localStorage
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];
    setReviews(savedReviews);
  }, [productId]);

  // Save review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) return alert("Please enter text and select a rating");

    const newReview = {
      id: Date.now(),
      text: reviewText,
      image: reviewImage,
      rating,
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updatedReviews));

    setReviewText('');
    setReviewImage('');
    setRating(0);
  };

  // Add to Cart
  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

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

          
          <div>
            <p className="font-semibold">Size</p>
            <div className="flex gap-2 mt-1">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
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
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1"
              >
                −
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-1"
              >
                +
              </button>
            </div>
          </div>

          
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-lg mt-6 hover:bg-gray-800 transition"
          >
            Add to Cart - ₹{product.price * quantity}
          </button>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <textarea
            className="w-full border p-3 rounded"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          
          
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={handleImageUpload}
          />

          
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                ★
              </span>
            ))}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Review
          </button>
        </form>

        {/* Display Reviews */}
        <div className="mt-6 space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first!</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="border-b pb-4">
                <div className="flex gap-2 items-center">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="mt-2">{rev.text}</p>
                {rev.image && (
                  <img src={rev.image} alt="Review" className="mt-2 w-32 h-32 object-cover rounded" />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      
      {showMessage && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          ✅ Item added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
