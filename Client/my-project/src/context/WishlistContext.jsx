import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    const syncUser = () => setUserId(localStorage.getItem("userId") || null);
    window.addEventListener("storage", syncUser);
    syncUser();
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // 👉 LOAD WISHLIST
  useEffect(() => {
    if (!userId) {
      setWishlist([]);
      return;
    }

    fetch(`https://thanhdatshoes.id.vn/api/auth/wishlist/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.wishlist) setWishlist(data.wishlist);
      })
      .catch((err) => console.error("Lỗi lấy wishlist:", err));
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
        productId: item._id, // FIX CHUẨN
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      },
    };

    try {
      const res = await fetch(
        `https://thanhdatshoes.id.vn/api/auth/wishlist/${uid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
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
