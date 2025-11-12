import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoImage from "../assets/LoGo.png";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import LoginDrawer from "./LoginDrawer";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "../context/CartProvider.jsx";
import WishlistDrawer from "./WishlistDrawer";


const navLinks = [
  { label: "HÀNG MỚI", href: "/comingsoon" },
  { label: "SẢN PHẨM", href: "/shoplist" },
  { label: "COLLECTION", href: "/collection" },
  { label: "SALE", href: "/comingsoon", red: true },
  { label: "HỆ THỐNG SHOWROOM", href: "/showroom" },
];

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const navigate = useNavigate();

  const { cartItems, setIsCartOpen } = useCart();
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const token = localStorage.getItem("token");

  const handleUserClick = () => {
    if (token) {
      navigate("/account"); // nếu đã đăng nhập → đến trang tài khoản
    } else {
      setLoginOpen(true); // nếu chưa → mở form đăng nhập
    }
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <header className="fixed top-0 left-0 right-0 z-[10000] bg-white border-b border-gray-200 shadow-sm h-[100px] flex items-center">
        <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="shrink-0">
            <img
              src={LogoImage}
              alt="EVASHOES"
              className="w-[150px] sm:w-[180px] h-auto object-contain"
            />
          </Link>

          {/* MENU LINKS */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link, index) => (
  <Link
    key={`${link.href}-${index}`} // ✅ đảm bảo key luôn duy nhất
    to={link.href}
    className={`relative group py-2 font-semibold ${
      link.red ? "text-red-600" : "text-black hover:text-[#206973]"
    }`}
  >
    {link.label}
    <span className="pointer-events-none absolute left-0 -bottom-3 h-[6px] rounded-sm bg-[#f4c400] w-0 group-hover:w-full transition-all duration-300" />
  </Link>
))}
  
          </nav>

          {/* ICONS */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* 🔍 Search */}
            <button onClick={() => setSearchOpen(true)}>
              <Search className="w-5 h-5 hover:text-[#D6001C]" />
            </button>

            {/* 👤 User */}
            <button onClick={handleUserClick}>
              <User className="w-5 h-5 hover:text-[#D6001C]" />
            </button>

            {/* 🤍 Heart */}
            <button onClick={() => setWishlistOpen(true)}>
              <Heart className="w-5 h-5 hover:text-[#D6001C]" />
            </button>


            {/* 🛒 Cart */}
            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5 hover:text-[#D6001C]" />
              {totalQty > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-[3px] font-semibold">
                  {totalQty}
                </span>
              )}
            </div>

            {/* ☰ Mobile Menu */}
            <button onClick={() => console.log("Mở menu mobile sau này...")}>
              <Menu className="w-6 h-6 hover:text-[#D6001C]" />
            </button>
          </div>
        </div>
      </header>

      {/* ===== SEARCH OVERLAY ===== */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ===== LOGIN DRAWER ===== */}
      <LoginDrawer isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        {/* ===== WISHLIST DRAWER ===== */}
<WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />

    </>
  );
}
