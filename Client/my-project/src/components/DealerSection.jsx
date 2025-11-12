import { RiFileList2Line, RiMapPin2Line, RiStore2Line } from "react-icons/ri";

export default function DealerSection() {
  return (
    <section className="w-full bg-[#F4C400] mt-14">
      <div className="main-container relative">

        <span className="hidden md:block absolute left-1/3 top-1/2 -translate-y-1/2 w-[2px] h-[44px] bg-black/90" />
        <span className="hidden md:block absolute left-2/3 top-1/2 -translate-y-1/2 w-[1.5px] h-[44px] bg-black/90" />

        <div className="grid grid-cols-1 md:grid-cols-3 text-center md:text-left">
          <a href="#" className="flex items-center justify-center md:justify-start gap-3 px-6 py-5">
            <RiFileList2Line className="w-6 h-6" />
            <span className="font-semibold uppercase">Chính sách hỗ trợ đại lý</span>
          </a>

          <a href="#" className="flex items-center justify-center md:justify-center gap-3 px-6 py-5">
            <RiMapPin2Line className="w-6 h-6" />
            <span className="font-semibold uppercase">Tìm showroom gần bạn</span>
          </a>

          <a href="#" className="flex items-center justify-center md:justify-end gap-3 px-6 py-5">
            <RiStore2Line className="w-6 h-6" />
            <span className="font-semibold uppercase">Trở thành đại lý Evashoes</span>
          </a>
        </div>
      </div>
    </section>
  );
}
