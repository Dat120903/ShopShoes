import React from "react";
import mapImg from "../../assets/imgM.png"; // ảnh bản đồ full ngang
import { FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="w-full mt-[100px]">
      {/* --- Tiêu đề --- */}
      <div className="w-full py-10 px-4 sm:px-8 lg:px-[300px]">
        <h1
          className="font-[700] text-[26px] sm:text-[30px] lg:text-[35px] uppercase tracking-[0%] leading-[100%] text-left"
          style={{ lineHeight: "100%" }}
        >
          Liên hệ
        </h1>
      </div>


      <div className="relative w-full overflow-hidden">
        <img
          src={mapImg}
          alt="Evashoes map"
          className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
        />


        <div className="absolute top-[28%] left-[18%] text-red-700 text-[30px] sm:text-[40px] lg:text-[50px] drop-shadow-md">
          <FaMapMarkerAlt />
        </div>

        <div className="absolute top-[62%] left-[46%] text-red-700 text-[30px] sm:text-[40px] lg:text-[50px] drop-shadow-md">
          <FaMapMarkerAlt />
        </div>

        <div className="absolute top-[25%] right-[18%] text-red-700 text-[30px] sm:text-[40px] lg:text-[50px] drop-shadow-md">
          <FaMapMarkerAlt />
        </div>
      </div>

      {/* --- Phần nội dung chính --- */}
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 sm:gap-8 gap-10 mb-16 md:items-start">
          <div className="text-center md:text-left flex items-start justify-center md:justify-start md:pl-[100px] lg:pl-[270px]">
            <h2 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold leading-[32px]">
              Công ty Cổ phần <br /> Thời trang Evashoes
            </h2>
          </div>

          <div className="text-[14px] sm:text-[15px] leading-[26px] sm:leading-[28px] text-[#222] space-y-2 sm:space-y-3 text-center md:text-left">
            <h1 className="text-[26px] sm:text-[32px] font-bold uppercase mb-2 md:hidden">
              Liên hệ
            </h1>
            <p>
              <span className="font-medium">Trụ sở chính:</span> Tầng 1, Số 26
              Nguyễn Phong Sắc, P. Dịch Vọng, Q. Cầu Giấy, Tp. Hà Nội
            </p>
            <p>
              <span className="font-medium">Điện thoại:</span> (024) 3793 2702
            </p>
            <p>
              <span className="font-medium">Hotline:</span> 1900 565 683
            </p>
            <p>
              <span className="font-medium">Email:</span> info@evashoes.com.vn
            </p>
            <p>
              <span className="font-medium">MST:</span> 0109912851
            </p>
          </div>
        </div>

        <div className="max-w-[800px] mx-auto w-full mt-10 px-2 sm:px-0">
          <h3 className="text-[22px] sm:text-[24px] font-semibold mb-5 uppercase text-left">
            Liên hệ với chúng tôi
          </h3>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Nội dung liên hệ hoặc cần tư vấn
              </label>
              <textarea
                rows="5"
                placeholder="Nhập nội dung..."
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none resize-none focus:border-black transition"
              ></textarea>
            </div>

            <div className="text-left">
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 uppercase text-[14px] font-medium hover:bg-gray-800 transition-all duration-200"
              >
                Gửi thông tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
