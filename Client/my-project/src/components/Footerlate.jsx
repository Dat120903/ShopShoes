import ImgTB from "../assets/imgTB.png";

export default function Footerlate() {
  return (
    <div className="w-full bg-black text-white">
      <div className="w-full max-w-[1410px] mx-auto px-5 md:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm text-gray-300">
          ©Công ty Cổ phần Thời trang Evashoes
        </div>

        <nav className="text-sm flex flex-wrap items-center gap-x-6 gap-y-2 justify-center">
          <a href="#" className="hover:text-white">Các thắc mắc thường gặp</a>
          <span className="opacity-40">|</span>
          <a href="#" className="hover:text-white">Điều khoản &amp; Điều kiện</a>
          <span className="opacity-40">|</span>
          <a href="#" className="hover:text-white">Chính sách bảo mật</a>
        </nav>

        <img src={ImgTB} alt="Đã thông báo Bộ Công Thương" className="h-6 object-contain" />
      </div>
    </div>
  );
}
