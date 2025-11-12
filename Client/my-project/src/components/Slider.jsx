import ImageSlider from "../assets/image.png";

export default function Slider() {
  return (
    <section className="w-full">
      <div className="relative w-full">
        {/* Ảnh nền */}
        <img
          src={ImageSlider}
          alt="Spring 2022: Pastel Palette"
          className="w-full h-auto object-cover 2xl:h-[650px] min-h-[360px]"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1410px] mx-auto px-4 sm:px-8 lg:px-12 text-white">
            <div className="w-[90%] sm:w-[66%] lg:w-[50%] 2xl:w-[720px]">
              <p className="font-nct-torin font-semibold uppercase text-white/95 mb-4 text-[12px] sm:text-[13px] 2xl:text-[14px] leading-[20px] sm:leading-[22px] 2xl:leading-[24px]">
                Our all-time favourites
              </p>

              <h1 className="font-nct-torin uppercase font-light text-white text-[clamp(32px,5.5vw,70px)] leading-[clamp(34px,5.5vw,70px)]">
                Spring 2022:
              </h1>

              <h2 className="font-nct-torin uppercase font-bold mt-1 text-white text-[clamp(36px,5.8vw,70px)] leading-[clamp(40px,6.4vw,80px)]">
                <span className="block">Pastel Palette</span>
              </h2>

              <button className="mt-7 inline-block uppercase font-semibold text-[12px] sm:text-[14px] 2xl:text-[16px] underline decoration-[3px] underline-offset-[10px] hover:opacity-90 transition-opacity">
                KHÁM PHÁ NGAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
