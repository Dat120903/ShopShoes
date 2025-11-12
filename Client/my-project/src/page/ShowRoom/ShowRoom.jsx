import React, { useState } from "react";
import { Search } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import mapBanner from "../../assets/imgM.png"; 

const storesData = [
  {
    id: 1,
    name: "Cửa hàng Hà Nội - Cầu Giấy",
    address: "26 Nguyễn Phong Sắc, Cầu Giấy, Hà Nội",
    phone: "1900 5656 83",
    hours: "09h00 - 22h00 (Kể cả chủ nhật và ngày lễ)",
  },
  {
    id: 2,
    name: "Cửa hàng Hà Nội - Tây Hồ",
    address: "Số 8 Xuân La, Tây Hồ, Hà Nội",
    phone: "1900 5656 83",
    hours: "09h00 - 22h00 (Kể cả chủ nhật và ngày lễ)",
  },
  {
    id: 3,
    name: "Cửa hàng Hà Nội - Từ Liêm",
    address: "Số 19 Phạm Văn Đồng, Từ Liêm, Hà Nội",
    phone: "1900 5656 83",
    hours: "09h00 - 22h00 (Kể cả chủ nhật và ngày lễ)",
  },
  {
    id: 3,
    name: "Cửa hàng Hà Nội - Từ Liêm",
    address: "Số 19 Phạm Văn Đồng, Từ Liêm, Hà Nội",
    phone: "1900 5656 83",
    hours: "09h00 - 22h00 (Kể cả chủ nhật và ngày lễ)",
  },
  {
    id: 4,
    name: "Cửa hàng Hà Nội - Từ Liêm",
    address: "Số 19 Phạm Văn Đồng, Từ Liêm, Hà Nội",
    phone: "1900 5656 83",
    hours: "09h00 - 22h00 (Kể cả chủ nhật và ngày lễ)",
  },
  {
    id: 5,
    name: "Cửa hàng Hà Nội - Từ Liêm",
    address: "Số 19 Phạm Văn Đồng, Từ Liêm, Hà Nội",
    phone: "1900 5656 83",
    hours: "09h00 - 22h00 (Kể cả chủ nhật và ngày lễ)",
  },
  {
    id: 6,
    name: "Cửa hàng Hà Nội - Từ Liêm",
    address: "Số 19 Phạm Văn Đồng, Từ Liêm, Hà Nội",
    phone: "1900 5656 83",
    hours: "09h00 - 22h00 (Kể cả chủ nhật và ngày lễ)",
  },
  {
    id: 7,
    name: "Cửa hàng Hà Nội - Từ Liêm",
    address: "Số 19 Phạm Văn Đồng, Từ Liêm, Hà Nội",
    phone: "1900 5656 83",
    hours: "09h00 - 22h00 (Kể cả chủ nhật và ngày lễ)",
  },
  {
    id: 8,
    name: "Cửa hàng Hà Nội - Từ Liêm",
    address: "Số 19 Phạm Văn Đồng, Từ Liêm, Hà Nội",
    phone: "1900 5656 83",
    hours: "09h00 - 22h00 (Kể cả chủ nhật và ngày lễ)",
  },
];

const Showroom = () => {
  const [search, setSearch] = useState("");

  const filteredStores = storesData.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="mt-[150px]">
      <h1 className="text-[26px] sm:text-[32px] lg:text-[35px] font-bold uppercase leading-[100%] text-left pl-[20px] sm:pl-[100px] lg:pl-[300px] mb-12">
        Hệ thống showroom
      </h1>

      <div className="relative w-full">
        <div className="aspect-[1918/752] w-full">
          <img
            src={mapBanner}
            alt="Evashoes showroom map"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-[28%] left-[22%] text-red-600 text-[30px] drop-shadow-md">
            <FaMapMarkerAlt />
          </div>

          <div className="absolute top-[52%] left-[46%] text-red-600 text-[30px] drop-shadow-md">
            <FaMapMarkerAlt />
          </div>

          <div className="absolute top-[26%] right-[23%] text-red-600 text-[30px] drop-shadow-md">
            <FaMapMarkerAlt />
          </div>
        </div>
      </div>

      <div className="max-w-[1050px] mx-auto px-4 sm:px-6 lg:px-8 mt-[40px] mb-20">
        <div className="text-left mb-10">
          <p className="text-gray-900 text-[26px] sm:text-[28px] leading-relaxed">
            Evashoes hiện có 72 cửa hàng trên toàn quốc.
            <br className="hidden sm:block" />
            Hãy tìm ngay cửa hàng gần nhất với bạn.
          </p>
        </div>

     
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <select className="border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none w-full">
            <option value="">Tỉnh / Thành Phố</option>
            <option value="hanoi">Hà Nội</option>
            <option value="hcm">TP. Hồ Chí Minh</option>
            <option value="hcm">Đà Nẵng</option>
          </select>

          <select className="border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none w-full">
            <option value="">Quận / Huyện</option>
            <option value="cg">Cầu Giấy</option>
            <option value="tx">Thanh Xuân</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm nhanh"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none"
            />
            <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-5"
            >
              <div className="space-y-1">
                <h3 className="font-semibold text-[16px]">{store.name}</h3>
                <p className="text-gray-600 text-[14px]">
                  Địa chỉ: {store.address}
                </p>
                <p className="text-gray-600 text-[14px]">
                  Điện thoại: {store.phone}
                </p>
                <p className="text-gray-500 text-[13px]">
                  Thời gian hoạt động: {store.hours}
                </p>
              </div>

              <div className="mt-3 sm:mt-0">
                <button className="text-[13px] font-semibold uppercase underline underline-offset-4 decoration-2 hover:text-gray-700 transition">
                  Xem trên bản đồ
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-35 mb-[130px]">
          <button className="text-[14px] sm:text-[15px] font-semibold uppercase underline decoration-[2px] underline-offset-[6px] hover:text-gray-700 transition">
            Xem thêm
          </button>
        </div>
      </div>
    </section>
  );
};

export default Showroom;
