import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE } from "../config/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // luôn đọc userId mới nhất
  const getUID = () => localStorage.getItem("userId");

  // load wishlist khi userId thay đổi
  const loadWishlist = async () => {
    const uid = getUID();
    if (!uid) {
      setWishlist([]);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/users/wishlist/${uid}`);
      if (!res.ok) {
        console.error("❌ Lỗi lấy wishlist:", res.status);
        setWishlist([]);
        return;
      }

      const data = await res.json();
      setWishlist(Array.isArray(data.wishlist) ? data.wishlist : []);
    } catch (err) {
      console.error("❌ Wishlist fetch failed:", err);
    }
  };

  // chạy khi mounted + khi login/logout
  useEffect(() => {
    loadWishlist();

    const onStorage = () => loadWishlist(); 
    const onAuth = () => loadWishlist();

    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onAuth);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onAuth);
    };
  }, []);

  // toggle wishlist
  const toggleWishlist = async (item) => {
    const uid = getUID();
    if (!uid) {
      window.dispatchEvent(new CustomEvent("open-login"));
      return;
    }

    const payload = {
      product: {
        productId: item._id || item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      },
    };

    try {
      const res = await fetch(`${API_BASE}/users/wishlist/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && Array.isArray(data.wishlist)) {
        setWishlist(data.wishlist);
      } else {
        console.error("❌ Lỗi cập nhật wishlist:", data.message);
      }
    } catch (err) {
      console.error("❌ Wishlist update failed:", err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
