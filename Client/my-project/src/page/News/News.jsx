import React, { useState } from "react";
import NewsItem from "./NewsItem";

import news1 from "../../assets/imgn1.png";
import news2 from "../../assets/imgn2.png";
import news3 from "../../assets/imgn3.png";
import news4 from "../../assets/imgn4.png";
import news5 from "../../assets/imgn5.png";
import news6 from "../../assets/imgn6.png";
import news7 from "../../assets/imgn7.png";
import news8 from "../../assets/imgn8.png";

const tabs = ["Tất cả", "Thời trang", "Phong cách", "Xu hướng"];

const News = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");

  const newsList = [
    { id: 1,image: news1, title: "Woman with good shoes is never be ugly place", date: "April 05, 2020", desc: "Midst one brought greater also morning green saying had good. Open stars day let over gathered, grass face one every light of under." },
    { id: 1,image: news2, title: "5 Tips to Increase Your Online Sales", date: "April 05, 2020", desc: "Midst one brought greater also morning green saying had good. Open stars day let over gathered, grass face one every light of under." },
    { id: 1,image: news3, title: "Tree earth fowl given moveth deep lesser After", date: "April 05, 2020", desc: "Midst one brought greater also morning green saying had good. Open stars day let over gathered, grass face one every light of under." },
    { id: 1,image: news4, title: "Given Set was without from god divide rule Hath", date: "April 05, 2020", desc: "Midst one brought greater also morning green saying had good. Open stars day let over gathered, grass face one every light of under." },
    { id: 1,image: news5, title: "Woman with good shoes is never be ugly place", date: "April 05, 2020", desc: "Midst one brought greater also morning green saying had good. Open stars day let over gathered, grass face one every light of under." },
    { id: 1,image: news6, title: "Given Set was without from god divide rule Hath", date: "April 05, 2020", desc: "Midst one brought greater also morning green saying had good. Open stars day let over gathered, grass face one every light of under." },
    { id: 1,image: news7, title: "Given Set was without from god divide rule Hath", date: "April 05, 2020", desc: "Midst one brought greater also morning green saying had good. Open stars day let over gathered, grass face one every light of under." },
    { image: news8, title: "Given Set was without from god divide rule Hath", date: "April 05, 2020", desc: "Midst one brought greater also morning green saying had good. Open stars day let over gathered, grass face one every light of under." },
  ];

  return (
    <section className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 mt-[150px]">
      <h1 className="text-[35px] font-bold uppercase mb-6">Tin tức</h1>

      {/* Tabs */}
      <div className="flex gap-8 mb-10 border-b border-gray-100 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`uppercase text-[15px] font-medium relative pb-2 ${
              activeTab === tab
                ? "border-b-[2px] border-black"
                : "text-gray-900 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {newsList.map((item, index) => (
          <NewsItem key={index} {...item} />
        ))}
      </div>

   
      <div className="text-center mt-25">
        <button className="text-[15px] font-medium uppercase underline underline-offset-8 decoration-[1.5px]">
          Xem thêm tin tức
        </button>
      </div>

      <div className="bg-gray-50 py-16 mt-16 text-center">
        <h2 className="text-[30px] font-semibold mb-8">Tiếp tục mua sắm</h2>
        <div className="flex justify-center gap-6">
          <button className="bg-black text-white px-8 py-3 text-[14px] uppercase font-medium hover:bg-gray-800">
            Mua sắm giày dép
          </button>
          <button className="border border-black px-8 py-3 text-[14px] uppercase font-medium hover:bg-black hover:text-white transition">
            Mua sắm túi xách
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;
