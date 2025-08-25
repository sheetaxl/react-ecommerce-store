import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/ui/skeleton";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gridCols, setGridCols] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const [perPage, setPerPage] = useState(12);

  
  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${perPage}&skip=${skip}`
      );
      const data = await res.json();

      if (!data.products || data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
        setSkip((prev) => prev + perPage);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, skip, perPage]);

  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight
      ) {
        fetchProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchProducts]);

  
  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setHasMore(true);
  }, [perPage]);

  useEffect(() => {
    if (products.length === 0 && hasMore) {
      fetchProducts();
    }
  }, [products, hasMore, fetchProducts]);

  // Skeleton loader grid
  const renderSkeletons = () => {
    return Array.from({ length: perPage }).map((_, idx) => (
      <div
        key={idx}
        className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3"
      >
        <Skeleton className="w-full h-56 rounded-md" />
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-full" />
      </div>
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen px-6 md:px-12 py-12">
      {/* Header */}
      <div className="text-center mb-14 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          Shop the Latest Trends
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          Explore our wide collection of fashionable and trending items for
          every style and season.
        </p>
      </div>

      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 max-w-7xl mx-auto space-y-4 md:space-y-0">
        
        <div className="flex space-x-2">
          <button
            onClick={() => setGridCols(3)}
            className={`px-4 py-2 rounded ${
              gridCols === 3 ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            3 per row
          </button>
          <button
            onClick={() => setGridCols(5)}
            className={`px-4 py-2 rounded ${
              gridCols === 5 ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            5 per row
          </button>
        </div>

        
        <div className="flex items-center space-x-2">
          <label htmlFor="perPage" className="text-gray-600 text-sm">
            Products per page:
          </label>
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
          </select>
        </div>
      </div>

      
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridCols} gap-8 max-w-7xl mx-auto animate-fade-in`}
      >
        {products.length === 0 && loading
          ? renderSkeletons()
          : products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-56 object-cover rounded-t-lg"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/400x250?text=Image+Not+Available")
                    }
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg text-gray-800 truncate">
                      {product.title}
                    </h3>
                    <p className="text-gray-500">${product.price}</p>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>

      
      <div className="text-center mt-8">
        {loading && products.length > 0 && (
          <p className="text-gray-500">Loading more products...</p>
        )}
        {!hasMore && (
          <p className="text-gray-500">No more products to load.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;




