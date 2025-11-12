import React from "react";
import { AuthProvider } from "./AuthContext.jsx";
import { CartProvider } from "./CartProvider.jsx";
import { WishlistProvider } from "./WishlistContext.jsx";

// ✅ Gom các provider người dùng, KHÔNG chứa AdminAuth
export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
