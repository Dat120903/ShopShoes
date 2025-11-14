import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  // 🧠 Nghe thay đổi userId (login/logout)
  useEffect(() => {
    const syncUser = () => setUserId(localStorage.getItem("userId") || null);

    window.addEventListener("storage", syncUser);
    syncUser(); // lần đầu

    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // 🧠 Load wishlist khi có userId
  useEffect(() => {
    if (!userId) {
      setWishlist([]);
      return;
    }

    fetch(`https://thanhdatshoes.id.vn/api/users/wishlist/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.wishlist) setWishlist(data.wishlist);
      })
      .catch((err) => console.error("Lỗi lấy wishlist:", err));
  }, [userId]);

  // ❤️ Toggle wishlist
  const toggleWishlist = async (product) => {
    const uid = localStorage.getItem("userId");

    if (!uid) {
      alert("Vui lòng đăng nhập để thêm sản phẩm yêu thích!");
      return;
    }

    try {
      const res = await fetch(
        `https://thanhdatshoes.id.vn/api/users/wishlist/${uid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product }),
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
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
