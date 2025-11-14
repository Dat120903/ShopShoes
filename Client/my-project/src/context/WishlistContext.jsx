import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE } from "../config/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  // Đồng bộ userId khi login / logout
  useEffect(() => {
    const syncUser = () => setUserId(localStorage.getItem("userId") || null);
    window.addEventListener("storage", syncUser);
    syncUser();
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // 👉 LOAD WISHLIST KHI CÓ userId
  useEffect(() => {
    if (!userId) {
      setWishlist([]);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await fetch(`${API_BASE}/users/wishlist/${userId}`);

        if (!res.ok) {
          console.error("❌ Lỗi lấy wishlist:", res.status);
          setWishlist([]);
          return;
        }

        const data = await res.json();
        if (Array.isArray(data.wishlist)) {
          setWishlist(data.wishlist);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        console.error("Lỗi lấy wishlist:", err);
      }
    };

    fetchWishlist();
  }, [userId]);

  // 👉 TOGGLE WISHLIST
  const toggleWishlist = async (item) => {
    const uid = localStorage.getItem("userId");

    if (!uid) {
      window.dispatchEvent(new CustomEvent("open-login"));
      return;
    }

    const payload = {
      product: {
        productId: item.productId || item._id,
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
      console.error("❌ Wishlist fetch failed:", err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
