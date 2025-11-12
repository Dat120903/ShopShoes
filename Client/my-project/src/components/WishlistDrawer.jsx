import React from "react";
import { X } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

const WishlistDrawer = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-[10050] transition-opacity duration-300"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-white shadow-2xl transform transition-transform duration-300 z-[10051] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-[18px] font-bold uppercase tracking-wide">
            Mục yêu thích
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:rotate-90 transition-transform"
          >
            <X className="w-5 h-5 text-gray-600 hover:text-black transition" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto h-[calc(100%-130px)]">
          {!wishlist || wishlist.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Bạn chưa có sản phẩm yêu thích nào.
            </p>
          ) : (
            <div className="space-y-6">
              {wishlist.map((item) => (
                <div
                  key={item.productId || item._id}
                  onClick={() => {
                    navigate(`/product/${item.productId || item._id}`);
                    onClose();
                  }}
                  className="flex items-center gap-4 border-b border-gray-200 pb-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[70px] h-[80px] object-cover rounded-sm border border-gray-100"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-[15px] text-[#111] leading-tight truncate">
                      {item.name}
                    </p>
                    <p className="text-[13px] text-gray-500">
                      {item.category || "Giày dép"}
                    </p>
                    <p className="text-[15px] font-semibold text-[#d6001c] mt-1">
                      {Number(item.price).toLocaleString()}₫
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 bg-white px-5 py-4">
          <button
            onClick={() => {
              onClose();
              navigate("/wishlist");
            }}
            className="w-full bg-[#111] text-white py-3 text-[13px] font-semibold uppercase hover:bg-black hover:scale-[1.02] transition-all duration-300"
          >
            Đi đến danh mục yêu thích
          </button>
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;
