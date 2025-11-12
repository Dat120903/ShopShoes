import imgLC from "../assets/imgLC.png";
import imgSS from "../assets/imgSS.png";

const Banner = () => {
  return (
    <section className="mt-20 w-full">
      <div className="w-full max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* === LEFT === */}
          <div className="relative w-full">
            <div className="w-full aspect-[690/398] overflow-hidden rounded-md">
              <img
                src={imgLC}
                alt="Lalasale Collection"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="absolute inset-0 bg-[#D6001C]/75" />

            {/* Text */}
            <div className="absolute bottom-7 left-7 sm:bottom-8 sm:left-8 text-white">
              <p className="text-[13px] sm:text-[15px] mb-2 tracking-wide">
                STARTING AT $19
              </p>
              <h2 className="text-[22px] sm:text-[26px] md:text-[28px] font-bold leading-tight">
                LALASALE COLLECTION
              </h2>
              <button className="mt-3 underline decoration-2 underline-offset-4 text-[12px] sm:text-[13px] font-semibold hover:opacity-90">
                MUA NGAY
              </button>
            </div>
          </div>

          {/* === RIGHT === */}
          <div className="relative w-full">
            <div className="w-full aspect-[690/398] overflow-hidden rounded-md">
              <img
                src={imgSS}
                alt="Summer Sandal"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="absolute inset-0 bg-black/5" />

            <div className="absolute bottom-7 left-7 sm:bottom-8 sm:left-8 text-white">
              <p className="text-[13px] sm:text-[15px] mb-2 tracking-wide">
                STARTING AT $39
              </p>
              <h2 className="text-[22px] sm:text-[26px] md:text-[28px] font-bold leading-tight">
                SUMMER SANDAL
              </h2>
              <button className="mt-3 underline decoration-2 underline-offset-4 text-[12px] sm:text-[13px] font-semibold hover:opacity-90">
                MUA NGAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
