import { Link } from "react-router-dom";


import {
  RiFacebookFill,
  RiInstagramLine,
  RiTiktokFill,
  RiYoutubeFill,
} from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2E2E2E] text-white">
      <div
        className="
          w-full max-w-[1410px] mx-auto 
          px-5 md:px-10 
          pt-16 pb-12 lg:pt-20 lg:pb-14 
          grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[230px_repeat(3,1fr)_320px] 
          gap-y-12 md:gap-x-8
        "
      >
        {/* === CỘT HOTLINE === */}
        <div className="space-y-6">
          <div>
            <p className="text-gray-300 mb-1 text-[14px]">Gọi mua hàng online:</p>
            <div className="text-[28px] lg:text-[34px] font-semibold tracking-tight">
              1900565683
            </div>
          </div>

          <div>
            <p className="text-gray-300 mb-1 text-[14px]">Hợp tác nhượng quyền:</p>
            <div className="text-[28px] lg:text-[34px] font-semibold tracking-tight">
              0935 868 666
            </div>
          </div>

          <div className="flex items-center gap-5 pt-6">
            <a href="#" aria-label="Facebook" className="hover:opacity-80">
              <RiFacebookFill className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:opacity-80">
              <RiInstagramLine className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="#" aria-label="Tiktok" className="hover:opacity-80">
              <RiTiktokFill className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="#" aria-label="Youtube" className="hover:opacity-80">
              <RiYoutubeFill className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* === CỘT EVASHOES === */}
        <div>
          <h4 className="font-semibold text-lg mb-6 uppercase">EVASHOES</h4>
          <ul className="space-y-4 text-gray-300 text-[15px]">
            <li><a href="/about" className="hover:text-white">Giới thiệu</a></li>
            <li>
              <a
                href="/showroom"
                className="hover:text-white"
              >
                Hệ thống Showroom
              </a>
            </li>
            <li>
              <Link to="/news" className="hover:text-white">
                Tin tức
              </Link>
            </li>
            <li><a href="/contact" className="hover:text-white">Liên hệ</a></li>
            <li><a href="#" className="hover:text-white">Chính sách đại lý</a></li>
          </ul>
        </div>

        {/* === CỘT SHOP === */}
        <div>
          <h4 className="font-semibold text-lg mb-6 uppercase">SHOP</h4>
          <ul className="space-y-4 text-gray-300 text-[15px]">
            <li><a href="/product/:id" className="hover:text-white">Giày Dép</a></li>
            <li><a href="/comingsoon" className="hover:text-white">Túi Xách</a></li>
            <li><a href="/comingsoon" className="hover:text-white">Sale</a></li>
            <li><a href="/comingsoon" className="hover:text-white">Collection</a></li>
            <li><a href="/comingsoon" className="hover:text-white">Tất cả sản phẩm</a></li>
          </ul>
        </div>

        {/* === CỘT HỖ TRỢ === */}
        <div>
          <h4 className="font-semibold text-lg mb-6 uppercase">HỖ TRỢ</h4>
          <ul className="space-y-4 text-gray-300 text-[15px]">
            <li><a href="/faq" className="hover:text-white">Hướng dẫn đặt hàng</a></li>
            <li><a href="/terms" className="hover:text-white">Thanh toán &amp; Giao nhận</a></li>
            <li><a href="/comingsoon" className="hover:text-white">Hướng dẫn chọn size</a></li>
            <li><a href="/notfound" className="hover:text-white">Quy định bảo hành</a></li>
            <li><a href="/comingsoon" className="hover:text-white">Chính sách đổi trả</a></li>
          </ul>
        </div>

        {/* === CỘT ĐĂNG KÝ === */}
        <div>
          <h4 className="uppercase font-semibold text-[20px] mb-6 tracking-wide">ĐĂNG KÝ</h4>

          <p className="text-white leading-[1.65] text-[15px] mb-7 max-w-[380px]">
            Hãy là người đầu tiên nhận được tin tức mới nhất
            về các xu hướng, khuyến mãi, và nhiều hơn nữa!
          </p>

          <form className="max-w-[420px]">
            <div className="flex items-stretch h-[46px] border border-white/50 hover:border-white transition-colors">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 min-w-0 bg-transparent px-4 text-[14px] text-white placeholder-white/70 outline-none"
              />
              <button
                type="submit"
                className="
                  shrink-0 whitespace-nowrap min-w-[90px]
                  px-5 text-[13.5px] font-medium
                  leading-none flex items-center justify-center
                  border-l border-white/50 hover:text-[#F4C400] transition-colors
                "
              >
                KẾT NỐI
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}
