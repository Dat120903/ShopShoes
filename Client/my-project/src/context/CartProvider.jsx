// src/context/CartProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Luôn đọc userId “mới nhất” trực tiếp từ localStorage để tránh stale state
  const getUID = () => localStorage.getItem("userId");

  // --- Helpers ---
  const userKey = () => {
    const uid = getUID();
    return uid ? `cart_user_${uid}` : null;
  };

  const saveNow = (next) => {
    const key = userKey();
    if (key) {
      localStorage.setItem(key, JSON.stringify(next));
      // console.log("💾 Saved cart instantly for user:", key, next);
    }
  };

  // --- Load khi mount & khi userId thay đổi (nghe custom + storage event) ---
  const loadForCurrentUser = () => {
    const key = userKey();
    if (!key) {
      setCartItems([]); // guest không lưu
      return;
    }
    const stored = localStorage.getItem(key);
    if (stored && stored !== "[]") {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        localStorage.removeItem(key);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    // lần đầu
    loadForCurrentUser();

    // khi tab khác thay đổi localStorage (hoặc AuthProvider bắn event)
    const onStorage = () => loadForCurrentUser();
    const onAuthChanged = () => loadForCurrentUser();

    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onAuthChanged);
    };
  }, []);

  // --- Actions ---
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find(
        (i) => i.id === product.id && i.color === product.color && i.size === product.size
      );
      const next = exist
        ? prev.map((i) =>
            i.id === product.id && i.color === product.color && i.size === product.size
              ? { ...i, qty: (i.qty || 1) + 1 }
              : i
          )
        : [...prev, { ...product, qty: 1, lineId: Date.now() }];

      saveNow(next);
      return next;
    });
  };

  const increaseQty = (lineId) => {
    setCartItems((prev) => {
      const next = prev.map((i) => (i.lineId === lineId ? { ...i, qty: (i.qty || 1) + 1 } : i));
      saveNow(next);
      return next;
    });
  };

  const decreaseQty = (lineId) => {
    setCartItems((prev) => {
      const next = prev
        .map((i) =>
          i.lineId === lineId ? { ...i, qty: Math.max(1, (i.qty || 1) - 1) } : i
        )
        .filter((i) => i.qty > 0);
      saveNow(next);
      return next;
    });
  };

  const removeFromCart = (lineId) => {
    setCartItems((prev) => {
      const next = prev.filter((i) => i.lineId !== lineId);
      saveNow(next);
      return next;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    const key = userKey();
    if (key) localStorage.removeItem(key);
  };

  // Gọi khi logout
  const refreshCartAfterLogout = () => {
    setCartItems([]);
  };

  const totalQty = cartItems.reduce((sum, i) => sum + (i.qty || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQty,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        refreshCartAfterLogout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
