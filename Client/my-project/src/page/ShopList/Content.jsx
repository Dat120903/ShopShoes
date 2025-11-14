import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

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
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://thanhdatshoes.id.vn/api/products")
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

  useEffect(() => {
    let list = [...products];

    if (selectedCat !== "Tất cả sản phẩm") {
      list = list.filter((p) => p.category === selectedCat);
    }

    if (sortOrder === "asc") list.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") list.sort((a, b) => b.price - a.price);

    setFiltered(list);
    setCurrentPage(1);
  }, [selectedCat, sortOrder, products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const currentProducts = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // 🔥 SỬA CHỖ 1
  const isLiked = (productId) => {
    return wishlist.some(
      (item) => item.productId === productId || item._id === productId
    );
  };

  return (
    <section className="w-full">
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
              {currentProducts.map((item) => (
                <div
                  key={item._id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <div className="relative w-full aspect-[330/400] overflow-hidden rounded-sm bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* ❤️ Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        if (!token && !localStorage.getItem("fumeesoft_token")) {
                          window.dispatchEvent(new CustomEvent("open-login"));
                          return;
                        }

                        // 🔥 SỬA CHỖ 2
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
                          isLiked(item._id)
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
              ))}
            </div>

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
