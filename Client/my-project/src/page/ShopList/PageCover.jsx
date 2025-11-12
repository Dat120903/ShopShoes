import React from "react";
import PageCoverImg from "../../assets/pagecover.png"; // ảnh banner 1920x390

export default function PageCover() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full aspect-[1920/490] min-h-[220px] sm:min-h-[260px] lg:min-h-[340px]">
        <img
          src={PageCoverImg}
          alt="All For Her"
          className="absolute inset-0 w-full h-full object-cover brightness-[1.0]"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-10 lg:px-20">
          <div className="max-w-[1410px] mx-auto w-full">
            <div className="flex flex-col items-start">
              <h1
                className="uppercase font-nct-torin font-extrabold tracking-tight 
                           text-[clamp(28px,5vw,56px)] leading-[clamp(34px,5vw,60px)] text-black"
              >
                ALL{" "}
                <span className="font-light text-while tracking-wide">FOR</span>{" "}
                HER
              </h1>


              <p
                className="mt-3 uppercase text-[#111] font-semibold 
                           text-[clamp(10px,2vw,14px)] tracking-wide"
              >
                HOME / SẢN PHẨM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
