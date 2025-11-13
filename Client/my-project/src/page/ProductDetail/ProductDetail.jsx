import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartProvider.jsx";
import toast from "react-hot-toast"; // ✅ thêm dòng này
import { API_BASE } from "../../config/api";


export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [recs, setRecs] = useState([]);
  const [color, setColor] = useState("pink");
  const [size, setSize] = useState("36");
  const [wishlist, setWishlist] = useState(new Set());
  const [showMoreImages, setShowMoreImages] = useState(false);
  const sizes = ["35", "36", "37", "38", "39"];

  


  useEffect(() => {
    const fetchDetail = async () => {
const res = await fetch(`https://thanhdatshoes.id.vn/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    if (id) fetchDetail();
  }, [id]);

  useEffect(() => {
    const fetchRecs = async () => {
const res = await fetch(`https://thanhdatshoes.id.vn/api/products/recommend/${id}`);
      const data = await res.json();
      setRecs(data);
    };
    if (id) fetchRecs();
  }, [id]);

  const toggleHeart = (rid) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(rid) ? next.delete(rid) : next.add(rid);
      return next;
    });
  };

  if (!product) return <p className="text-center mt-20">Đang tải dữ liệu...</p>;

  const topImages = product.images?.slice(0, 4) || [product.image];
  const bottomImages = product.images?.slice(4, 8) || [];

  return (
    <section className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 mt-[200px] mb-[80px]">
      {/* ===== HÌNH ẢNH + THÔNG TIN ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-[62%_38%] gap-6 lg:gap-8">
        {/* ẢNH TRÁI */}
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 gap-4 w-full">
            {topImages.map((src, i) => (
              <img key={i} src={src} alt="" className="w-full h-full object-cover" />
            ))}
          </div>

          {bottomImages.length > 0 && (
            <button
              onClick={() => setShowMoreImages(!showMoreImages)}
              className="mt-4 px-5 py-[6px] border border-[#111] text-[#111] text-[13px] uppercase font-medium hover:bg-[#111] hover:text-white transition-all duration-300"
            >
              {showMoreImages ? "Thu gọn ảnh" : "Xem thêm ảnh"}
            </button>
          )}

          {showMoreImages && (
            <div className="grid grid-cols-4 gap-4 mt-4 w-full animate-fadeIn">
              {bottomImages.map((src, i) => (
                <img key={`bot-${i}`} src={src} alt="" className="w-full h-full object-cover" />
              ))}
            </div>
          )}
        </div>

        {/* PHẢI - THÔNG TIN */}
        <div className="pt-1">
          <p className="text-[13px] text-[#000] font-bold uppercase mb-3 text-left">
            HOME / SẢN PHẨM / {product.category || "GIÀY DÉP"}
          </p>

          <h1 className="text-[24px] sm:text-[28px] leading-[1.25] text-[#111] mt-[45px]">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mt-2 mb-4">
            {product.oldPrice && (
              <span className="text-[22px] sm:text-[24px] text-[#bdbdbd] line-through">
                {Number(product.oldPrice).toLocaleString()}đ
              </span>
            )}
            <span className="text-[24px] sm:text-[26px] text-[#D6001C] font-semibold">
              {Number(product.price).toLocaleString()}đ
            </span>
          </div>

          <p className="text-[15px] leading-[1.8] text-[#000] mb-6">
            {product.description}
          </p>

          {/* COLOR */}
<div className="mb-4">
  <div className="uppercase text-[14px] font-semibold tracking-wide mb-2">
    COLOR
  </div>
  <div className="flex items-center gap-4">
    {[
      { id: "black", bg: "bg-black" },
      { id: "pink", bg: "bg-[#e25a5d]" },
      { id: "gray", bg: "bg-[#ececec]" },
      {
        id: "pattern",
        bg: "bg-[radial-gradient(circle,#000_15%,transparent_16%)] bg-[length:8px_8px] bg-white",
      },
    ].map((c) => (
      <button
        key={c.id}
        onClick={() => setColor(c.id)}
        aria-label={c.id}
        className={`relative w-[26px] h-[26px] rounded-full flex items-center justify-center border transition-all duration-200 ${
          color === c.id
            ? "border-[2.5px] border-[#111] scale-110 shadow-[0_0_0_3px_rgba(0,0,0,0.15)]"
            : "border border-[#ccc] hover:shadow-[0_0_0_3px_rgba(0,0,0,0.1)] hover:scale-[1.05]"
        }`}
      >
        <span
          className={`block w-[16px] h-[16px] rounded-full ${c.bg}`}
        ></span>
      </button>
    ))}
  </div>
</div>


          {/* SIZE */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="uppercase text-[14px] font-semibold tracking-wide">SIZES</div>
              <a
                href="#"
                className="text-[11px] font-medium text-[#111] relative after:content-[''] after:block after:h-[2px] after:w-[120px] after:bg-[#111] after:mt-[6px]"
              >
                HƯỚNG DẪN CHỌN SIZE
              </a>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-[40px] min-w-[46px] px-3 border ${
                    size === s
                      ? "bg-[#111] text-white"
                      : "bg-transparent text-[#111] border-[#d9d9d9] hover:bg-[#f5f5f5]"
                  } text-[14px] font-medium`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

<div className="flex flex-col gap-3 mb-8 mt-8">
  {/* 🛍️ Nút MUA NGAY */}
  <button
    onClick={() => {
      const item = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: color || "default",
        size: size || "default",
      };

      // ✅ Thêm sản phẩm vào giỏ hàng trước
      addToCart(item);

      // ✅ Sau đó đưa người dùng sang GIỎ HÀNG (bước 01), không nhảy thẳng qua thanh toán
      setTimeout(() => navigate("/cart"), 150);
    }}
    className="relative h-[46px] bg-[#111] text-white uppercase text-[14px] font-semibold overflow-hidden group transition-all duration-300"
  >
    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
      MUA NGAY
    </span>
    <span className="absolute inset-0 bg-gradient-to-r from-[#222] to-[#444] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"></span>
  </button>

  {/* 🧺 Nút THÊM VÀO GIỎ HÀNG */}
  <button
    onClick={() => {
      const item = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: color || "default",
        size: size || "default",
      };

      addToCart(item);

      // ✅ Thông báo Toast rõ ràng hơn
      toast.success("🛒 Đã thêm sản phẩm vào giỏ hàng!", {
        style: {
          borderRadius: "8px",
          background: "#111",
          color: "#fff",
          fontSize: "14px",
          padding: "8px 14px",
        },
        iconTheme: {
          primary: "#D6001C",
          secondary: "#fff",
        },
      });
    }}
    className="relative h-[46px] border border-[#111] text-[#111] bg-white uppercase text-[14px] font-semibold overflow-hidden group transition-all duration-300"
  >
    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
      THÊM VÀO GIỎ HÀNG
    </span>
    <span className="absolute inset-0 bg-[#111] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
  </button>
</div>




          {/* ❤️ / SHARE */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-[14px] font-medium uppercase text-[#111] relative after:content-[''] after:block after:h-[3px] after:w-[180px] after:bg-[#111] after:mt-[8px]">
              <span className="inline-block align-middle mr-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8">
                  <path d="M20.8 4.6a5.3 5.3 0 0 0-7.5 0L12 5.9l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5l8.8 8.8 8.8-8.8a5.3 5.3 0 0 0 0-7.5z" />
                </svg>
              </span>
              THÊM VÀO MỤC YÊU THÍCH
            </div>
            <div className="text-[14px] font-medium uppercase text-[#111] flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.6 10.9l6.8-3.8M8.6 13.1l6.8 3.8" />
              </svg>
              SHARE
            </div>
          </div>

          {/* SKU / TAG / DESC / CAM KẾT */}
          <div className="text-[14px] text-[#222] space-y-[6px] mb-3">
            <p><span className="font-semibold">SKU:</span> {product.sku || "N/A"}</p>
            <p><span className="font-semibold">CATEGORIES:</span> {Array.isArray(product.categories) ? product.categories.join(", ") : product.category}</p>
            <p><span className="font-semibold">TAGS:</span> {Array.isArray(product.tags) ? product.tags.join(", ") : "shoe, women, sport"}</p>
          </div>

          <div className="flex items-center gap-10 text-[16px] font-semibold mb-7">
            <span className="text-[#111] relative after:content-[''] after:block after:h-[4px] after:w-[150px] after:bg-[#111] after:mt-[1px]">
              MÔ TẢ SẢN PHẨM
            </span>
            <span className="text-[#8b8b8b]">THÔNG TIN CHI TIẾT</span>
          </div>

          <p className="text-[15px] leading-[1.8] text-[#000] mb-8">{product.longDescription}</p>

          <div className="space-y-6 mb-8 border-t border-gray-200 pt-8">
            <div className="flex items-start gap-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8">
                <path d="M3 5h2l2 12h11" />
                <circle cx="9" cy="19" r="1.8" />
                <circle cx="18" cy="19" r="1.8" />
                <rect x="7" y="7" width="13" height="7" rx="1" />
              </svg>
              <div>
                <p className="uppercase font-semibold text-[#111]">MIỄN PHÍ GIAO HÀNG TOÀN QUỐC</p>
                <p className="text-[14px] text-[#6b6b6b]">Miễn phí giao nhận với đơn hàng từ 300.000 VND</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8">
                <path d="M6 13V9a6 6 0 0 1 12 0v4" />
                <path d="M4 13v3a3 3 0 0 0 3 3h1v-6H7a3 3 0 0 0-3 3z" />
              </svg>
              <div>
                <p className="uppercase font-semibold text-[#111]">HỖ TRỢ VÀ TƯ VẤN 24/7</p>
                <p className="text-[14px] text-[#6b6b6b]">Đội ngũ tư vấn viên thân thiện sẵn sàng hỗ trợ khách hàng 24/7</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8">
                <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <div>
                <p className="uppercase font-semibold text-[#111]">CAM KẾT VỀ CHẤT LƯỢNG SẢN PHẨM</p>
                <p className="text-[14px] text-[#6b6b6b]">Luôn cam kết chất lượng, bảo hành sản phẩm lên đến 12 tháng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GỢI Ý */}
      <div className="mt-30">
        <h2 className="text-[22px] sm:text-[24px] font-semibold mb-12">
          CÓ THỂ <span className="font-extrabold">NÀNG SẼ THÍCH</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {recs.map((item) => (
            <div key={item._id} onClick={() => navigate(`/product/${item._id}`)}>
              <div className="bg-[#f3f3f3] aspect-[4/5] overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-[#8d8d8d] text-[13px]">{item.category || "Giày dép"}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleHeart(item._id);
                  }}
                  className="p-1 -mr-1 group"
                  aria-label="Add to wishlist"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    className={`transition-colors ${
                      wishlist.has(item._id)
                        ? "fill-[#D6001C] stroke-[#D6001C]"
                        : "fill-none stroke-[#6b6b6b] group-hover:stroke-[#D6001C]"
                    }`}
                  >
                    {/* ✅ path trái tim chuẩn */}
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
                    />
                  </svg>

                </button>
              </div>

              <p className="text-[15px] font-medium text-[#111] leading-tight">
                {item.name}
              </p>
              <p className="text-[15px] font-semibold text-[#111] mb-22">
                {Number(item.price).toLocaleString()}đ
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

