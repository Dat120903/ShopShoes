import React from "react";
import { Link } from "react-router-dom";
import imgTop from "../../assets/imageC.png"; 
import imgMid from "../../assets/imgN.png"; 
import imgX from "../../assets/imgx.png";


const AboutUs = () => {
  return (
    <section className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 mt-[100px] mb-[100px]">
      {/* Tiêu đề */}
      <h1 className="text-[30px] sm:text-[38px] font-bold uppercase text-center mb-10">
        Về thương hiệu EVASHOES
      </h1>

      <div className="w-full aspect-[1410/550] overflow-hidden mb-10">
        <img
          src={imgTop}
          alt="Evashoes factory"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[1000px] mx-auto text-[#222] font-light leading-[28px] space-y-8">
        {/* OUR STORY */}
        <div>
          <h2 className="text-[20px] font-semibold mb-3 uppercase">
            Our Story
          </h2>
          <p className="font-medium">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p className="mt-3">
            Saw wherein fruitful good days image them, waters upon, saw.
            Seas lights seasons. Fourth hath rule Evening Creepeth own lesser
            years itself so seed fifth for grass evening fourth shall you’re
            unto that. Female replenish for yielding so saw all one to yielding
            grass you'll air sea it, open waters subdue. Brought second Made. Be.
            Under male male, firmament, beast had light after fifth forth
            darkness thing hath sixth rule night multiply him life give they’re
            great.Seas lights seasons. Fourth days image them, waters upon , saw.
          
          </p>
        </div>

        {/* OUR MISSION + OUR VISION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-18">
          <div>
            <h3 className="font-medium text-[16px] mb-2">Our Mission</h3>
            <p>
              Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-[16px] mb-2">Our Vision</h3>
            <p>
              Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
          </div>
        </div>

        {/* THE COMPANY */}
        <div className="mt-18">
          <h3 className="font-medium text-[16px] mb-2 uppercase text-gray-600">
            The Company
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sapien dignissim a elementum. Sociis metus, hendrerit mauris id in. Quis sit sit ultrices tincidunt euismod luctus diam. Turpis sodales orci etiam phasellus lacus id leo. Amet turpis nunc, nulla massa est viverra interdum. Praesent auctor nulla morbi non posuere mattis. Arcu eu id maecenas cras. Eget fames tincidunt leo, sed vitae, pretium interdum. Non massa, imperdiet nunc sit sapien. Tempor lectus ornare quis mi vel. 
            <p className="mt-6">Nibh euismod donec elit posuere lobortis consequat faucibus aliquam metus. Ornare consequat, vulputate sit maecenas mauris urna sed fringilla. Urna fermentum iaculis pharetra, maecenas dui nullam nullam rhoncus. Facilisis quis vulputate sem gravida lacus, justo placerat.</p>
 
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto mt-16 mb-10 aspect-[1200/650] overflow-hidden">
        <img
          src={imgMid}
          alt="Evashoes worker"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

<div className="flex justify-center gap-4 flex-wrap mt-4">
  {[imgX, imgX, imgX, imgX, imgX, imgX, imgX, imgX, imgX].map(
    (img, index) => (
      <div
        key={index}
        className="w-[117px] h-[117px] overflow-hidden rounded-sm cursor-pointer"
      >
        <img
          src={img}
          alt={`Evashoes image ${index + 1}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    )
  )}
</div>

{/* SHARE */}
<div className="w-full mt-26">
 
  <div className="flex flex-col items-center justify-center">
    <div className="flex items-center gap-2 text-gray-700 uppercase text-[14px] font-medium tracking-wide hover:text-black transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 12v.01M12 4v.01M20 12v.01M4.93 19.07l.01-.01M19.07 4.93l.01-.01M19.07 19.07l.01-.01M4.93 4.93l.01-.01M12 20v.01"
        />
      </svg>
      SHARE
    </div>
  </div>


  <div className="border-t border-gray-200 mt-26 w-full"></div>

  {/* PREV / NEXT POST */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-10 gap-8 text-gray-800">
  
    <div className="sm:w-1/2">
      <div className="flex items-center gap-2 text-gray-400 uppercase text-[13px] font-semibold tracking-wide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Previous Post
      </div>
      <p className="mt-2 text-[16px] text-[#222] hover:underline underline-offset-4 cursor-pointer">
        Given Set was without from god divide rule Hath
      </p>
    </div>

    {/* Next Post */}
    <div className="sm:w-1/2 text-right sm:text-right">
      <div className="flex items-center justify-end gap-2 text-gray-400 uppercase text-[13px] font-semibold tracking-wide">
        Next Post
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <p className="mt-2 text-[16px] text-[#222] hover:underline underline-offset-4 cursor-pointer">
        Tree earth fowl given moveth deep lesser After
      </p>
    </div>
  </div>

  <div className="border-t border-gray-200 mt-8"></div>
</div>

    </section>
  );
};

export default AboutUs;
