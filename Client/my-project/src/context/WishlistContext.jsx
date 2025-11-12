import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  // 🧭 Theo dõi thay đổi của localStorage (đăng nhập / đăng xuất)
  useEffect(() => {
    const checkUser = () => {
      const id = localStorage.getItem("userId");
      setUserId(id);
    };

    // khi có thay đổi từ login/logout
    window.addEventListener("storage", checkUser);
    checkUser(); // kiểm tra lần đầu

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  // 📦 Lấy wishlist từ server khi đăng nhập
  useEffect(() => {
    if (!userId) {
      setWishlist([]); // ✅ clear khi logout
      return;
    }

    fetch(`http://localhost:5000/api/auth/wishlist/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWishlist(data);
        else if (data.wishlist) setWishlist(data.wishlist);
      })
      .catch((err) => console.error("Lỗi lấy wishlist:", err));
  }, [userId]);

  // ✅ Toggle yêu thích (thêm hoặc xóa)
  const toggleWishlist = async (product) => {
    const currentId = localStorage.getItem("userId");
    if (!currentId) {
      alert("Vui lòng đăng nhập để thêm sản phẩm yêu thích!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/wishlist/${currentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });

      const data = await res.json();
      if (res.ok) {
        setWishlist(data.wishlist);
      } else {
        console.error("Lỗi cập nhật wishlist:", data.message);
      }
    } catch (err) {
      console.error("Lỗi fetch wishlist:", err);
    }
  };

  // 🔹 Hàm clear thủ công (có thể dùng thêm trong logout nếu muốn)
  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);
