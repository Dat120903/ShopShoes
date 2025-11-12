import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AccountSidebar from "../../components/AccountSidebar";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <section className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 mt-[120px] min-h-[70vh]">
      <h1 className="text-[32px] font-bold uppercase mb-10">DANH MỤC YÊU THÍCH</h1>

      <div className="flex flex-col md:flex-row gap-10 text-[16px] text-gray-700 leading-relaxed">
        <AccountSidebar className="relative z-10" />
        <div className="flex-1">
          {(!wishlist || wishlist.length === 0) ? (
            <p className="text-center text-gray-500 text-lg py-20">
              Bạn chưa có sản phẩm yêu thích nào.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {wishlist.map((item) => (
                <div
                  key={item.productId || item._id}
                  className="relative group border border-gray-200 rounded-sm overflow-hidden bg-white hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/product/${item.productId || item._id}`)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition z-10"
                  >
                    <X size={18} />
                  </button>

                  <img src={item.image} alt={item.name} className="w-full aspect-[330/400] object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="p-3 text-center">
                    <p className="text-[14px] text-gray-500">{item.category}</p>
                    <p className="text-[16px] font-semibold mt-1 leading-snug">{item.name}</p>
                    {item.price && (
                      <p className="text-[16px] font-bold text-red-600 mt-1">
                        {Number(item.price).toLocaleString()}₫
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
