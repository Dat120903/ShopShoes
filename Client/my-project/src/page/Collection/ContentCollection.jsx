import React from "react";
import { Link } from "react-router-dom";

// Ảnh
import img1 from "../../assets/imgc1.png";
import img2 from "../../assets/imgc2.png";
import img3 from "../../assets/imgc3.png";
import img4 from "../../assets/imgc4.png";
import img5 from "../../assets/imgc5.png";
import img6 from "../../assets/imgc6.png";
import img7 from "../../assets/imgc7.png";
import img8 from "../../assets/imgc8.png";

const items = [
  { id: 1, title: "Summer Taste", tag: "SPORTY SANDALS AND SNEAKERS", img: img1 },
  { id: 2, title: "Spring Collection 2020", tag: "SPRING COLLECTION", img: img2 },
  { id: 3, title: "Sun Moon", tag: "NEW ARRIVAL", img: img3 },
  { id: 4, title: "Your Next Move", tag: "THE FOLD", img: img4 },
  { id: 5, title: "Sporty Sandals And Sneakers", tag: "FASHION", img: img5 },
  { id: 6, title: "Shirt in Vintage Plaid", tag: "FIND YOUR FIT", img: img6 },
  { id: 7, title: "Young And Free", tag: "FASHION", img: img7 },
  { id: 8, title: "Feel-Good Hues", tag: "ACCESSORIES", img: img8 },
];

export default function ContentCollection() {
  return (
    <section className="max-w-[1435px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-nct-torin font-semibold leading-tight tracking-tight text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px] mb-12">
        New Season
        <br />
        and New Trends
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[260px] gap-y-[200px]">
        {items.map((item, index) => (
          <article
            key={item.id}
            className={`relative
              ${index % 2 !== 0 ? "-mt-[185px]" : ""}
              ${item.id === 6 ? "mt-[15px]" : ""}
              ${item.id === 8 ? "mt-[10px]" : ""}
            `}
          >
            <div className="relative w-full overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="block w-full h-auto object-cover"
                loading="lazy"
              />

              <span
                className="
                  absolute
                  font-semibold uppercase text-black tracking-[0.22em]
                  text-[11px] sm:text-xs md:text-sm
                "
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  transform: "rotate(90deg) translateY(-100%)",
                  transformOrigin: "top left",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.25em",
                }}
              >
                {item.tag}
              </span>
            </div>

            <div className="mt-10">
              <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold">
              {item.title}
            </h3>

            <p className="mt-2 text-[12px] md:text-[13px] font-semibold uppercase">
              <Link
                to="/collectiondetail"
                className="inline-flex items-baseline gap-1 cursor-pointer mb-10"
                aria-label="Go to collection detail"
              >
                <span className="underline decoration-black decoration-2 underline-offset-8">
                  Discover
                </span>
                <span>Now</span>
              </Link> 
            </p>
          </div>
          </article>
        ))}
      </div>  

      <div className="h-20" />
    </section>
  );
}
