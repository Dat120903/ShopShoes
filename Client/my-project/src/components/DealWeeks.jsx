import imgDOW from "../assets/imgDow.png";

export default function DealWeeks() {
  return (
    <section className="mt-20 w-full">
      {/* --- DESKTOP / LAPTOP --- */}
      <div className="hidden md:block w-full">
        <div className="relative w-full h-[600px]">
          <div className="grid grid-cols-2 w-full h-full">
            {/* --- CỘT VÀNG --- */}
            <div className="bg-[#F4C400] flex flex-col justify-between">
          
              <div className="w-full max-w-[1410px] mx-auto px-6 lg:px-10 xl:px-16 pt-10 lg:pt-14">
                <p className="uppercase text-[13px] lg:text-[14px] font-medium leading-[20px]">
                  Giảm giá trong tuần
                </p>
                <h1 className="font-nct-torin font-[400] mt-3 text-[clamp(36px,6vw,84px)] leading-[1.05]">
                  MIDSUMMER
                  <br />DAYS
                </h1>
                <button className="mt-6 inline-block text-[13px] lg:text-[14px] font-semibold uppercase underline decoration-2 underline-offset-8 hover:opacity-90">
                  MUA HÀNG NGAY
                </button>
              </div>

              {/* Bộ đếm thời gian */}
              <div className="w-full max-w-[1410px] mx-auto px-6 lg:px-10 xl:px-16 pb-10 lg:pb-14">
                <div className="flex items-center gap-6 lg:gap-10">
                  {[
                    { n: "05", t: "NGÀY" },
                    { n: "07", t: "GIỜ" },
                    { n: "09", t: "PHÚT" },
                    { n: "03", t: "GIÂY" },
                  ].map((i, idx) => (
                    <div key={idx} className="flex items-end gap-6">
                      <div className="text-center">
                        <div className="text-[22px] lg:text-[26px] font-semibold leading-none text-[#1F1F1F]">
                          {i.n}
                        </div>
                        <div className="text-[11px] lg:text-[12px] mt-1 text-gray-700">
                          {i.t}
                        </div>
                      </div>
                      {idx !== 3 && (
                        <span className="text-[24px] lg:text-[28px] font-semibold leading-none text-[#1F1F1F]">
                          :
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative w-full h-full">
              <img
                src={imgDOW}
                alt="Deal of the Week"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE / TABLET --- */}
      <div className="md:hidden grid grid-cols-1 gap-4">

        <div className="bg-[#F4C400] p-6 flex flex-col justify-between">
          <div>
            <p className="uppercase text-[12px] leading-[18px] font-medium">
              Giảm giá trong tuần
            </p>
            <h1 className="font-nct-torin font-[400] text-[clamp(30px,10vw,44px)] leading-[1.1] mt-2">
              MIDSUMMER
              <br />DAYS
            </h1>
            <button className="mt-4 inline-block text-[12px] font-semibold uppercase underline decoration-2 underline-offset-6 hover:opacity-90">
              MUA HÀNG NGAY
            </button>
          </div>

          <div className="mt-6 flex items-center gap-5">
            {[
              { n: "05", t: "NGÀY" },
              { n: "07", t: "GIỜ" },
              { n: "09", t: "PHÚT" },
              { n: "03", t: "GIÂY" },
            ].map((i, idx) => (
              <div key={idx} className="flex items-end gap-4">
                <div className="text-center">
                  <div className="text-[18px] font-semibold leading-none text-[#1F1F1F]">
                    {i.n}
                  </div>
                  <div className="text-[10px] mt-1 text-gray-700">{i.t}</div>
                </div>
                {idx !== 3 && (
                  <span className="text-[18px] font-semibold leading-none text-[#1F1F1F]">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full aspect-[16/10]">
          <img
            src={imgDOW}
            alt="Deal of the Week"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
