import React, { useState, useEffect } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

export default function Content() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("Tất cả sản phẩm");
  const [sortOrder, setSortOrder] = useState("default");
  const [view, setView] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 16;

  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // 📦 Lấy danh sách sản phẩm
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFiltered(data);
          const catSet = new Set(data.map((p) => p.category).filter(Boolean));
          setCategories(["Tất cả sản phẩm", ...Array.from(catSet)]);
        }
      })
      .catch((err) => console.error("❌ Lỗi:", err));
  }, []);

  // 🔄 Lọc và sắp xếp
  useEffect(() => {
    let list = [...products];
    if (selectedCat !== "Tất cả sản phẩm") {
      list = list.filter((p) => p.category === selectedCat);
    }
    if (sortOrder === "asc") list.sort((a, b) => a.price - b.price);
    else if (sortOrder === "desc") list.sort((a, b) => b.price - a.price);
    setFiltered(list);
    setCurrentPage(1);
  }, [selectedCat, sortOrder, products]);

  // ✅ Cuộn lên đầu mỗi khi đổi trang
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // hoặc "smooth" nếu muốn cuộn mượt
    });
  }, [currentPage]);

  // 🔢 Phân trang
  const totalPages = Math.ceil(filtered.length / perPage);
  const currentProducts = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleProductClick = (id) => navigate(`/product/${id}`);

  return (
    <section className="w-full">
      {/* 🔍 Thanh filter đẹp giữ nguyên layout ShopFilter */}
      <div className="w-full bg-white border-b border-gray-200 mt-6">
        <div className="max-w-[1410px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="hidden md:flex items-center justify-between h-[48px]">
            {/* Bộ lọc trái */}
            <div className="flex items-center gap-10 lg:gap-16 xl:gap-20 text-[14px]">
          
              {/* Danh mục */}
              <div className="flex items-center gap-5 font-semibold">
                <span>DANH MỤC</span>
                <select
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-black"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Giá */}
              <div className="flex items-center gap-5 font-semibold">
                <span>GIÁ</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-black"
                >
                  <option value="default">Mặc định</option>
                  <option value="asc">Thấp → Cao</option>
                  <option value="desc">Cao → Thấp</option>
                </select>
              </div>
            </div>

            {/* VIEW bên phải */}
            <div className="flex items-center gap-4 text-[14px] font-semibold">
              <span>VIEW</span>
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setView(n)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    view === n
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🧩 Danh sách sản phẩm */}
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-20">
            Không có sản phẩm nào.
          </p>
        ) : (
          <>
            <div
              className={`grid grid-cols-${view} gap-x-6 gap-y-10 transition-all`}
            >
              {currentProducts.map((item) => {
                const isFav = wishlist?.some(
                  (p) => p.productId?.toString() === item._id
                );

                return (
                  <div
                    key={item._id}
                    className="group cursor-pointer"
                    onClick={() => handleProductClick(item._id)}
                  >
                    <div className="relative w-full aspect-[330/400] overflow-hidden rounded-sm bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist({
                            productId: item._id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            category: item.category,
                          });
                        }}
                        className="absolute bottom-3 right-3"
                      >
                        <Heart
                          className={`w-6 h-6 transition-colors duration-300 ${
                            isFav
                              ? "text-[#D6001C] fill-[#D6001C]"
                              : "text-gray-600 hover:text-[#D6001C]"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="mt-3 text-[16px] font-semibold line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-gray-600">
                      {item.price.toLocaleString()}₫
                    </p>
                  </div>
                );
              })}
            </div>

            {/* 📄 Phân trang */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
                >
                  Trước
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
                >
                  Sau
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
