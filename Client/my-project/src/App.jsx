import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// COMPONENTS
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import NewsletterPopup from "./components/NewsletterPopup";
import DealerSection from "./components/DealerSection";
import Footer from "./components/Footer";
import Footerlate from "./components/Footerlate";
import ScrollToTop from "./components/ScrollToTop";
import Slider from "./components/Slider";
import Paner from "./components/Paner";
import TrendProduct from "./components/TrendProduct";
import DealWeeks from "./components/DealWeeks";
import Banner from "./components/Banner";
import Limited from "./components/Limited";
import Instagram from "./components/Instagram";
import ServiceSection from "./components/ServiceSection";

// PAGES
import ShopList from "./page/ShopList/ShopList";
import Collection from "./page/Collection/Collection";
import ContentCollection from "./page/Collection/ContentCollection";
import CollectionDetail from "./page/Collection/CollectionDetail";
import News from "./page/News/News";
import NewsDetail from "./page/News/NewsDetail";
import AboutUs from "./page/AboutUs/AboutUs";
import Contact from "./page/Contact/Contact";
import ShowRoom from "./page/ShowRoom/ShowRoom";
import FAQ from "./page/FAQ/FAQ";
import Terms from "./page/Terms/Terms";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import Wishlist from "./page/Wishlist/Wishlist";
import Cart from "./page/Cart/Cart";
import Checkout from "./page/Checkout/Checkout";
import OrderConfirm from "./page/OrderConfirm/OrderConfirm";
import MyAccount from "./page/Account/MyAccount";
import Orders from "./page/Account/Orders";
import AccountDetails from "./page/Account/AccountDetails";
import ComingSoon from "./page/ComingSoon/ComingSoon";
import NotFound from "./page/NotFound/NotFound";

// ADMIN
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AdminCoupons from "./admin/AdminCoupons";
import AdminRoute from "./routes/AdminRoute";
import AdminLogin from "./admin/AdminLogin";

// CONTEXT
import AppProviders from "./context/Providers.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";


// ============================
// LAYOUT người dùng
// ============================
const UserLayout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const hideFooter = ["/notfound", "/comingsoon"].includes(path);
  const showNewsletter = path === "/";

  return (
    <>
      <Navbar />
      <CartDrawer />
      {children}
      {!hideFooter && <DealerSection />}
      {!hideFooter && <Footer />}
      {!hideFooter && <Footerlate />}
      {showNewsletter && <NewsletterPopup />}
    </>
  );
};


// ============================
// APP CHÍNH
// ============================
export default function App() {

  // 🧩 XỬ LÝ TOKEN FUMEE TRẢ VỀ
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("fumeesoft_token", token);

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        localStorage.setItem("user", JSON.stringify(payload));
      } catch (e) {
        console.error("Token Fumee không hợp lệ:", e);
      }

      // XÓA token khỏi URL
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.pathname);
    }
  }, []);


  return (
    <AppProviders>
      <Router>
        <ScrollToTop />

        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <UserLayout>
                <main className="pt-[100px]">
                  <Slider />
                  <Paner />
                  <TrendProduct />
                  <DealWeeks />
                  <Banner />
                  <Limited />
                  <Instagram />
                  <ServiceSection />
                </main>
              </UserLayout>
            }
          />

          {/* USER ROUTES */}
          <Route path="/shoplist" element={<UserLayout><ShopList /></UserLayout>} />
          <Route path="/collection" element={<UserLayout><Collection /></UserLayout>} />
          <Route path="/contentcollection" element={<UserLayout><ContentCollection /></UserLayout>} />
          <Route path="/collectiondetail" element={<UserLayout><CollectionDetail /></UserLayout>} />
          <Route path="/news" element={<UserLayout><News /></UserLayout>} />
          <Route path="/news/:id" element={<UserLayout><NewsDetail /></UserLayout>} />
          <Route path="/about" element={<UserLayout><AboutUs /></UserLayout>} />
          <Route path="/contact" element={<UserLayout><Contact /></UserLayout>} />
          <Route path="/showroom" element={<UserLayout><ShowRoom /></UserLayout>} />
          <Route path="/faq" element={<UserLayout><FAQ /></UserLayout>} />
          <Route path="/terms" element={<UserLayout><Terms /></UserLayout>} />
          <Route path="/product/:id" element={<UserLayout><ProductDetail /></UserLayout>} />
          <Route path="/wishlist" element={<UserLayout><Wishlist /></UserLayout>} />
          <Route path="/cart" element={<UserLayout><Cart /></UserLayout>} />
          <Route path="/checkout" element={<UserLayout><Checkout /></UserLayout>} />
          <Route path="/order-confirm" element={<UserLayout><OrderConfirm /></UserLayout>} />
          <Route path="/account" element={<UserLayout><MyAccount /></UserLayout>} />
          <Route path="/orders" element={<UserLayout><Orders /></UserLayout>} />
          <Route path="/account-details" element={<UserLayout><AccountDetails /></UserLayout>} />
          <Route path="/comingsoon" element={<UserLayout><ComingSoon /></UserLayout>} />
          <Route path="/notfound" element={<UserLayout><NotFound /></UserLayout>} />

          {/* ADMIN */}
          <Route
            path="/admin/*"
            element={
              <AdminAuthProvider>
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              </AdminAuthProvider>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="coupons" element={<AdminCoupons />} />
          </Route>

          <Route path="/admin-login" element={<AdminAuthProvider><AdminLogin /></AdminAuthProvider>} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster
          position="top-right"
          containerStyle={{ position: "fixed", top: 16, right: 16, zIndex: 999999 }}
          toastOptions={{
            duration: 2500,
            style: { background: "#111", color: "#fff", borderRadius: "8px", fontSize: "14px" },
            iconTheme: { primary: "#D6001C", secondary: "#fff" },
          }}
        />

      </Router>
    </AppProviders>
  );
}
