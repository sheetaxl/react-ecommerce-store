// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 12;

const SearchResults = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const query = params.get("q")?.trim() || "";
  const page = Math.max(1, parseInt(params.get("page") || "1", 10));

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Fetch search results
  useEffect(() => {
    if (!query) {
      setItems([]);
      setTotal(0);
      return;
    }

    let ignore = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const skip = (page - 1) * PAGE_SIZE;
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${PAGE_SIZE}&skip=${skip}`
        );
        const json = await res.json();

        if (!ignore) {
          setItems(json.products || []);
          setTotal(json.total || 0);
        }
      } catch (e) {
        console.error("Search results failed:", e);
        if (!ignore) {
          setItems([]);
          setTotal(0);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();
    return () => { ignore = true; };
  }, [query, page]);

  // Navigate with smooth scroll
  const goToPage = (p) => {
    navigate(`/search?q=${encodeURIComponent(query)}&page=${p}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 Small helper: skeletons while loading
  const renderSkeletons = () =>
    Array.from({ length: PAGE_SIZE }).map((_, i) => (
      <div key={i} className="animate-pulse bg-gray-200 h-64 rounded" />
    ));

  // 🔹 Small helper: single product card
  const ProductCard = ({ p }) => (
    <Link to={`/product/${p.id}`}>
      <article className="group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
        <div className="relative">
          <img
            src={p.thumbnail}
            alt={p.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x250?text=No+Image")}
          />
          {p.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 text-xs bg-black text-white px-2 py-1 rounded">
              {Math.round(p.discountPercentage)}% OFF
            </span>
          )}
        </div>
        <div className="p-3 text-center">
          <h3 className="font-medium text-sm line-clamp-2 min-h-[3rem]">{p.title}</h3>
          <div className="mt-2 font-semibold">₹{p.price}</div>
        </div>
      </article>
    </Link>
  );

  // 🔹 Small helper: pagination buttons
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pagesToShow = Array.from(
      new Set([1, page - 1, page, page + 1, totalPages].filter((n) => n >= 1 && n <= totalPages))
    );

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
          className={`px-3 py-2 rounded border ${page <= 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          ← Prev
        </button>

        {pagesToShow.map((n, idx, arr) => {
          const showEllipsis = idx > 0 && n - arr[idx - 1] > 1;
          return (
            <React.Fragment key={n}>
              {showEllipsis && <span className="px-1">…</span>}
              <button
                onClick={() => goToPage(n)}
                className={`px-3 py-2 rounded border ${n === page ? "bg-black text-white" : "hover:bg-gray-100"}`}
              >
                {n}
              </button>
            </React.Fragment>
          );
        })}

        <button
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
          className={`px-3 py-2 rounded border ${page >= totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          Next →
        </button>
      </div>
    );
  };

  // 🔹 No search query
  if (!query) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <p className="text-gray-600">Type your query in the search bar (top right).</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Results for “{query}”</h1>
          <p className="text-gray-600">{loading ? "Loading…" : `${total} products found`}</p>
        </div>
        <div className="text-sm text-gray-500">Page {page} of {totalPages}</div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? renderSkeletons()
          : items.length === 0
          ? <p className="col-span-full text-gray-600">No products matched your search.</p>
          : items.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default SearchResults;

