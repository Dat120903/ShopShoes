import React from "react";
import { useParams, Link } from "react-router-dom";

import imgTop from "../../assets/imgd1.png";
import imgMid1 from "../../assets/imgd2.png";
import imgMid2 from "../../assets/images_2.png";
import imgBot1 from "../../assets/imgd4.png";
import imgBot2 from "../../assets/imgd5.png";
import imgBot3 from "../../assets/imgd6.png";

const POSTS = [
  { id: 1, title: "Woman with good shoes is never be ugly place" },
  { id: 2, title: "5 Tips to Increase Your Online Sales" },
  { id: 3, title: "Tree earth fowl given moveth deep lesser After" },
  { id: 4, title: "Given Set was without from god divide rule Hath" },
];

const NewsDetail = () => {
  const { id } = useParams();
  const idx = Math.max(0, POSTS.findIndex(p => String(p.id) === String(id)));
  const prev = POSTS[(idx - 1 + POSTS.length) % POSTS.length];
  const next = POSTS[(idx + 1) % POSTS.length];

  return (
    <section className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 mt-[150px]">
    
      <div className="text-left mb-10">
        <h1 className="text-[28px] sm:text-[34px] font-bold uppercase mb-3">
          5 Tips To Increase Your Online Sales
        </h1>
        <p className="text-[13px] text-gray-500 uppercase">
          By Admin &nbsp; | &nbsp; April 05, 2020 &nbsp; | &nbsp; Trends
        </p>
      </div>

      <div className="w-full aspect-[1410/550] overflow-hidden mb-10">
        <img src={imgTop} alt="Detail cover" className="w-full h-full object-cover" />
      </div>

      
      <section className="w-full flex justify-center">
        <div
          className="
            w-full max-w-[930px]
            px-4 sm:px-6 lg:px-8
            font-['NCT_Torin'] font-[400]
            text-[14px] leading-[30px] text-[#222]
            space-y-8
          "
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sapien dignissim a elementum.
            Sociis metus, hendrerit mauris id in. Quis sit sit ultrices tincidunt euismod luctus diam.
            Turpis sodales orci etiam phasellus lacus id leo. Amet turpis nunc, nulla massa est viverra
            interdum. Praesent auctor nulla morbi non posuere mattis. Arcu eu id maecenas cras. Eget fames
            tincidunt leo, sed vitae, pretium interdum. Non massa, imperdiet nunc sit sapien.
          </p>

          <h3 className="font-semibold text-[16px] mt-2">Sed do eiusmod tempor incididunt ut labore</h3>

          <p>
            Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons.
            Fourth hath rule Evening Creepth own lesser years itself so seed fifth for grass evening
            fourth shall you're unto that. Had. Female replenish for yielding so saw all one to yielding
            grass you'll air sea it, open waters subdue, hath. Brought second Made. Be. Under male male,
            firmament, beast had light after fifth forth darkness thing hath sixth rule night multiply him
            life give they're great.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-8">
            <div className="text-left">
              <h4 className="font-semibold mb-3">Why choose product?</h4>
              <ul className="list-disc list-inside marker:text-gray-400 space-y-2">
                <li>Create by cotton fabric with soft and smooth</li>
                <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
                <li>Downloadable/Digital Products, Virtual Products</li>
              </ul>
            </div>

            <div className="text-left">
              <h4 className="font-semibold mb-3">Sample Number List</h4>
              <ol className="list-decimal list-inside marker:text-gray-400 space-y-2">
                <li>Create Store-specific attributes on the fly</li>
                <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
                <li>Downloadable/Digital Products, Virtual Products</li>
              </ol>
            </div>
          </div>

          <p>
            She'd years darkness days. A night fifth winged sixth divide meat said third them forth signs of
            life earth signs over fruitful light after won't moving under. Thing yielding upon seed.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-10">
        <div className="aspect-[570/650] overflow-hidden">
          <img src={imgMid1} alt="mid1" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-[570/650] overflow-hidden">
          <img src={imgMid2} alt="mid2" className="w-full h-full object-cover" />
        </div>
      </div>

     
      <section className="w-full flex justify-center mt-10">
        <div
          className="
            w-full max-w-[930px]
            text-[#222] font-['NCT_Torin'] font-[400]
            text-[14px] leading-[30px]
            space-y-8 px-4 sm:px-6 lg:px-8
          "
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sapien dignissim a elementum. Sociis metus, hendrerit mauris id in. Quis sit sit ultrices tincidunt euismod luctus diam. Turpis sodales orci etiam phasellus lacus id leo. Amet turpis nunc, nulla massa est viverra interdum. Praesent auctor nulla morbi non posuere mattis. Arcu eu id maecenas cras. Eget fames tincidunt leo, sed vitae, pretium interdum. Non massa, imperdiet nunc sit sapien. Tempor lectus ornare quis mi vel. Nibh euismod donec elit posuere lobortis consequat faucibus aliquam metus. Ornare consequat, vulputate sit maecenas mauris urna sed fringilla. Urna fermentum iaculis pharetra, maecenas dui nullam nullam rhoncus. Facilisis quis vulputate sem gravida lacus, justo placerat.
          </p>

          <p>
            She'd years darkness days. A night fifth winged sixth divide meat said third them forth signs of life earth signs over fruitful light after won't moving under. Thing yielding upon seed. Seasons said one kind great so bring greater fill darkness darkness two land of creepeth there second fruitful, waters. Make don't void years Gathering gathering divide fill.
          </p>

        
          <div className="flex flex-col items-center justify-center mt-21 mb-6">
            <div className="flex items-center gap-2 text-gray-700 uppercase text-[14px] font-medium tracking-wide hover:text-black transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v.01M12 4v.01M20 12v.01M4.93 19.07l.01-.01M19.07 4.93l.01-.01M19.07 19.07l.01-.01M4.93 4.93l.01-.01M12 20v.01" />
              </svg>
              SHARE
            </div>
          </div>
        </div>
      </section>

   
      <div className="bg-gray-50 py-16 text-center mt-16">
        <h2 className="text-[28px] font-semibold mb-8">Tiếp tục mua sắm</h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <button className="bg-black text-white px-8 py-3 text-[14px] uppercase font-medium hover:bg-gray-800 transition">
            Mua sắm giày dép
          </button>
          <button className="border border-black px-8 py-3 text-[14px] uppercase font-medium hover:bg-black hover:text-white transition">
            Mua sắm túi xách
          </button>
        </div>
      </div>

    
      <div className="border-t border-gray-200 pt-8 mt-8">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <Link to={`/news/${prev.id}`} className="group sm:max-w-[48%]">
            <div className="flex items-center gap-2 text-gray-400 uppercase text-[13px] font-semibold tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Previous Post
            </div>
            <p className="mt-2 text-[16px] text-[#222] group-hover:underline underline-offset-4">
              {prev.title}
            </p>
          </Link>

          <Link to={`/news/${next.id}`} className="group sm:max-w-[48%] sm:text-right">
            <div className="flex items-center gap-2 justify-end text-gray-400 uppercase text-[13px] font-semibold tracking-wide">
              Next Post
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="mt-2 text-[16px] text-[#222] group-hover:underline underline-offset-4">
              {next.title}
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-30 mb-[150px]">
        <h3 className="text-[34px] font-bold uppercase mb-10 text-center">
          Bài viết liên quan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[imgBot1, imgBot2, imgBot3].map((img, i) => (
            <div key={i}>
              <div className="aspect-[450/400] overflow-hidden">
                <img src={img} alt={`related-${i}`} className="w-full h-full object-cover" />
              </div>
              <p className="mt-3 text-[13px] text-gray-500 uppercase">
                By Admin | April 05, 2020
              </p>
              <h4 className="text-[18px] font-medium mt-1">
                Woman with good shoes is never be ugly place
              </h4>
              <p className="text-[14px] text-gray-600 mt-2 leading-[26px]">
                Midst one brought greater also morning green saying had good.
                Open stars day let over gathered, grass face one every light of under.
              </p>
              <button className="mt-3 text-[13px] font-semibold uppercase underline underline-offset-4 decoration-2 hover:text-gray-800">
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
