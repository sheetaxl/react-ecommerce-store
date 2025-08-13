// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 12;

const SearchResults = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const q = params.get("q") || "";
  const page = Math.max(1, parseInt(params.get("page") || "1", 10));

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      if (!q.trim()) {
        setItems([]);
        setTotal(0);
        return;
      }
      try {
        setLoading(true);
        const skip = (page - 1) * PAGE_SIZE;
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=${PAGE_SIZE}&skip=${skip}`
        );
        const json = await res.json();
        if (!ignore) {
          setItems(json.products || []);
          setTotal(json.total || 0);
        }
      } catch (e) {
        console.error("Search results failed", e);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [q, page]);

  const goToPage = (p) => {
    navigate(`/search?q=${encodeURIComponent(q)}&page=${p}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!q.trim()) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <p className="text-gray-600">Type your query in the search bar (top right).</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Results for “{q}”</h1>
          <p className="text-gray-600">{loading ? "Loading…" : `${total} products found`}</p>
        </div>
        <div className="text-sm text-gray-500">Page {page} of {totalPages}</div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-64 rounded" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-gray-600">No products matched your search.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`}>
              <article className="group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <div className="relative">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x250?text=No+Image")}
                  />
                  {p.discountPercentage ? (
                    <span className="absolute top-2 left-2 text-xs bg-black text-white px-2 py-1 rounded">
                      {Math.round(p.discountPercentage)}% OFF
                    </span>
                  ) : null}
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-medium text-sm line-clamp-2 min-h-[3rem]">{p.title}</h3>
                  <div className="mt-2 font-semibold">₹{p.price}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            className={`px-3 py-2 rounded border ${page <= 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            ← Prev
          </button>

          {/* Simple numeric pagination (first, current-1, current, current+1, last) */}
          {Array.from(
            new Set([1, page - 1, page, page + 1, totalPages].filter((n) => n >= 1 && n <= totalPages))
          ).map((n, idx, arr) => {
            const showEllipsis =
              idx > 0 && n - arr[idx - 1] > 1;
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
      )}
    </div>
  );
};

export default SearchResults;
