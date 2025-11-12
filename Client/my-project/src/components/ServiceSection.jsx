// src/components/ServiceSection.jsx
import { Truck, Headphones, ShieldCheck } from "lucide-react";

export default function ServiceSection() {
  return (
    <section className="mt-16">
      <div
        className="
          mx-auto w-full
          max-w-[calc(100vw-32px)]
          sm:max-w-[calc(100vw-64px)]
          md:max-w-[calc(100vw-160px)]
          2xl:max-w-[1800px]
          py-10 md:py-14
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-10 text-center">
          <div>
            <Truck className="mx-auto mb-5 text-black" size={56} strokeWidth={2} />
            <h3 className="font-semibold uppercase text-[18px] md:text-[20px]">
              MIỄN PHÍ GIAO HÀNG TOÀN QUỐC
            </h3>
            <p className="mt-3 text-gray-500 text-[14px] md:text-[16px] leading-[22px] md:leading-[24px]">
              Miễn phí giao nhận với đơn hàng
              <br /> từ 300.000 VND
            </p>
          </div>

          <div>
            <Headphones className="mx-auto mb-5 text-black" size={56} strokeWidth={2} />
            <h3 className="font-semibold uppercase text-[18px] md:text-[20px]">
              HỖ TRỢ VÀ TƯ VẤN 24/7
            </h3>
            <p className="mt-3 text-gray-500 text-[14px] md:text-[16px] leading-[22px] md:leading-[24px]">
              Đội ngũ tư vấn viên thân thiện và
              <br /> sẵn sàng giúp đỡ 24/7
            </p>
          </div>

          <div>
            <ShieldCheck className="mx-auto mb-5 text-black" size={56} strokeWidth={2} />
            <h3 className="font-semibold uppercase text-[18px] md:text-[20px]">
              CAM KẾT VỀ CHẤT LƯỢNG
            </h3>
            <p className="mt-3 text-gray-500 text-[14px] md:text-[16px] leading-[22px] md:leading-[24px]">
              Đổi trả trong vòng 30 ngày
              <br /> Thời hạn bảo hành lên đến 12 tháng
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
