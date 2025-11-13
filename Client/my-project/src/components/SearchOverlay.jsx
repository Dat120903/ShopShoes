import React, { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config/api";


const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const visibleCount = 5;
  const sliderRef = useRef(null);

   useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const delay = setTimeout(() => fetchProducts(query), 400);
    return () => clearTimeout(delay);
  }, [query]);

  const fetchProducts = async (q) => {
    try {
      setLoading(true);
const res = await fetch(`https://thanhdatshoes.id.vn/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.items || []);
      setIndex(0);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    if (index > 0) setIndex(index - 1);
  };
  const scrollRight = () => {
    if (index < results.length - visibleCount) setIndex(index + 1);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay mờ */}
      <div className="fixed inset-0 bg-black/40 z-[9998]" onClick={onClose}></div>

      {/* Box tìm kiếm */}
      <div
        className="fixed top-[100px] left-0 right-0 z-[10001] bg-white border-t border-gray-200 shadow-md animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-[1410px] mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <p className="text-[13px] text-gray-600 font-medium">
              Bạn đang quan tâm tới sản phẩm hay dịch vụ của Evashoes?
            </p>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-700 hover:text-black" />
            </button>
          </div>

          {/* Ô input */}
          <div className="flex items-center border-b border-gray-300 mt-4 mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm ngay"
              className="flex-1 py-2 text-[15px] outline-none placeholder:text-gray-500"
            />
            <Search className="w-5 h-5 text-gray-500 mr-2" />
          </div>

          {/* Không có kết quả */}
          {query && !loading && results.length === 0 && (
            <p className="text-gray-400 text-sm mt-4">Không tìm thấy sản phẩm nào.</p>
          )}

          {/* Có kết quả */}
          {query && !loading && results.length > 0 && (
            <div className="relative overflow-hidden">
              <hr className="border-black mb-6" />

              {/* Nút trái */}
              {results.length > visibleCount && (
                <button
                  onClick={scrollLeft}
                  disabled={index === 0}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow-md w-9 h-9 flex items-center justify-center ${
                    index === 0 ? "opacity-30 cursor-default" : "hover:bg-gray-100"
                  } z-10`}
                >
                  <span className="text-lg font-bold">‹</span>
                </button>
              )}

              {/* Nút phải */}
              {results.length > visibleCount && (
                <button
                  onClick={scrollRight}
                  disabled={index >= results.length - visibleCount}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow-md w-9 h-9 flex items-center justify-center ${
                    index >= results.length - visibleCount ? "opacity-30 cursor-default" : "hover:bg-gray-100"
                  } z-10`}
                >
                  <span className="text-lg font-bold">›</span>
                </button>
              )}

              {/* Slider */}
              <div
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${index * 20}%)`,
                }}
              >
                {results.map((item, i) => (
                  <Link
                    key={item._id || i}
                    to={`/product/${item._id}`}
                    onClick={onClose}
                    className="flex-[0_0_20%] px-[6px] block group"
                  >
                    <div className="overflow-hidden rounded-sm">
                      <img
                        src={item.image || item.images?.[0]}
                        alt={item.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-700 space-y-0.5">
                      <p className="text-gray-500 text-[12px]">Sản phẩm</p>
                      <p className="font-normal truncate">{item.name}</p>
                      <div className="flex items-center gap-2">
                        {item.oldPrice && (
                          <span className="text-gray-400 line-through text-[13px]">
                            {item.oldPrice.toLocaleString()}đ
                          </span>
                        )}
                        <span className="text-[#D6001C] font-semibold text-[14px]">
                          {item.price?.toLocaleString()}đ
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchOverlay;
