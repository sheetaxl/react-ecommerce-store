import { useState, useEffect, useCallback } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gridSize, setGridSize] = useState(3);

  // ✅ Fetch Products with error handling
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=12&skip=${skip}`
      );
      const data = await res.json();
      setProducts((prev) => [...prev, ...data.products]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [skip]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading
      ) {
        setSkip((prev) => prev + 12);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // ✅ Grid class generator
  const getGridClasses = () => {
    return gridSize === 3
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-5";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">All Products</h2>

        {/* Grid size selector */}
        <select
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
          className="border p-2 rounded-md"
        >
          <option value={3}>3 per row</option>
          <option value={5}>5 per row</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${getGridClasses()}`}>
        {products.map((p) => (
          <div
            key={p.id}
            className="border bg-white rounded-md p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-bold mt-2">{p.title}</h3>
            <p className="text-gray-600">₹{p.price}</p>
          </div>
        ))}
      </div>

      {/* Loader */}
      {loading && (
        <p className="text-center mt-6 text-gray-500">
          Loading more products...
        </p>
      )}
    </div>
  );
}

export default ProductsPage;
