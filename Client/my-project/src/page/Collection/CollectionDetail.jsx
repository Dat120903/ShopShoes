import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Heart } from "lucide-react"; 

// Ảnh
import hero from "../../assets/imgbn.png";
import big1 from "../../assets/imgb1.png"; 
import big2 from "../../assets/imgb2.png"; 
import small1 from "../../assets/img1.png"; 
import small2 from "../../assets/img1.png";
import small3 from "../../assets/img1.png";
import small4 from "../../assets/img1.png";

export default function CollectionDetail() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const products = [
    { id: 1, img: big1, name: "Cropped Faux Leather Jacket", category: "Boot", price: 29, size: "big" },
    { id: 2, img: big2, name: "Calvin Shorts", category: "Dresses", price: 62, size: "big" },
    { id: 3, img: small1, name: "Kirby T-Shirt", category: "Dresses", price: 17, size: "small" },
    { id: 4, img: small2, name: "Cableknit Shawl", category: "Dresses", price: 129, sale: 99, size: "small" },
    { id: 5, img: small3, name: "Colorful Jacket", category: "Dresses", price: 29, size: "small" },
    { id: 6, img: small4, name: "Cotton Jersey T-Shirt", category: "Dresses", price: 17, size: "small" },
  ];

  return (
    <main className="w-full">
      <section className="w-full">
        <div
          className="
            mt-[185px]
            max-w-[1410px] mx-auto
            px-4 sm:px-6 lg:px-8
            text-center lg:text-left
            relative
            lg:translate-x-[20%]
          "
        >
          <h1
            className="
              font-nct-torin 
              font-bold 
              text-[28px] sm:text-[30px] md:text-[33px] lg:text-[35px]
              leading-[100%]
              uppercase
            "
          >
            SPRING 2022: THE ATHLEISURE EDIT
          </h1>

          <p
            className="
              font-nct-torin 
              font-semibold 
              text-[12px] sm:text-[13px] md:text-[14px]
              leading-[24px]
              text-[#1E1E1E]/80
              mt-3
            "
          >
            <Link to="/" className="hover:underline">
              HOME
            </Link>{" "}
            / COLLECTION / SPRING 2022: THE ATHLEISURE EDIT
          </p>
        </div>

        <div className="relative w-full mt-6">
          <div className="w-full overflow-hidden">
            <img
              src={hero}
              alt="SPRING 2022: THE ATHLEISURE EDIT"
              className="
                w-full 
                h-auto 
                object-cover 
                sm:object-contain 
                md:object-cover 
                lg:object-cover 
                xl:object-cover
              "
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===== DESCRIPTION SECTION ===== */}
      <section
        className="
          mt-[170px]
          max-w-[930px]
          mx-auto
          px-4 sm:px-6
          text-left
        "
      >
        <p
          className="
            font-nct-torin
            font-normal
            text-[14px]
            leading-[30px]
            text-[#1E1E1E]
          "
        >
          Fashion trends come and go, but athleisure’s popularity does not seem to be waning at
          all. In fact, its aesthetic has continuously evolved over the years. What used to conjure
          images of sporty sneakers and duffle bags now encompass so much more — relaxed,
          utilitarian designs, such as practical hobo bags and ankle strap thong sandals, will help
          you achieve a chic and comfortable look.
        </p>

        <h3
          className="
            font-nct-torin 
            font-semibold 
            text-[18px] 
            mt-10 
            mb-4 
            text-left
          "
        >
          Athleisure Meets Utility
        </h3>

        <p
          className="
            font-nct-torin
            font-normal
            text-[14px]
            leading-[30px]
            text-[#1E1E1E]
            text-left
          "
        >
          The addition of functional and stylish details takes our new seasonal athleisure-style
          accessories to the next level. For instance, ‘90s-inspired platform thong sandals feature
          ankle straps that offer a more secure fit, while shoulder bags are accessorised with mini
          detachable pouches that add visual interest and storage space.
        </p>
      </section>

      {/* ===== PRODUCT GRID SECTION ===== */}
      <section
        className="
          mt-[180px]
          max-w-[1410px]
          mx-auto
          px-4 sm:px-6 lg:px-8
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {products
            .filter((p) => p.size === "big")
            .map((item) => (
              <div
                key={item.id}
                className="relative w-full aspect-[570/760] overflow-hidden"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {products
            .filter((p) => p.size === "small")
            .map((item) => (
              <div key={item.id}>
                <div className="relative w-full aspect-[330/400] overflow-hidden bg-gray-50">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[13px] text-gray-500">{item.category}</p>
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="ml-2"
                  >
                    <Heart
                      size={18}
                      color={wishlist.includes(item.id) ? "red" : "black"}
                      fill={wishlist.includes(item.id) ? "red" : "none"}
                    />
                  </button>
                </div>

                <h4 className="text-[15px] font-medium mt-1">{item.name}</h4>
                {item.sale ? (
                  <p className="text-[14px] mt-1">
                    <span className="line-through mr-2 text-gray-400">
                      ${item.price}
                    </span>
                    <span className="text-red-600 font-semibold">
                      ${item.sale}
                    </span>
                  </p>
                ) : (
                  <p className="text-[14px] mt-1">${item.price}</p>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* ===== EXTRA DESCRIPTION SECTION ===== */}
      <section
        className="
          mt-[210px]
          max-w-[930px]
          mx-auto
          px-4 sm:px-6
          text-left
        "
      >
        <h3
          className="
            font-nct-torin 
            font-semibold 
            text-[18px] 
            mb-4 
            text-left
          "
        >
          Athleisure In The Workplace
        </h3>

        <p
          className="
            font-nct-torin
            font-normal
            text-[14px]
            leading-[30px]
            text-[#1E1E1E]
          "
        >
          Want to pull off athleisure in the workplace? It is all about finding a balance. Sporty sandals
          appear less casual and more polished when styled with an elegant maxi dress. Featuring a gorgeous
          quilted finish, the Candy hobo bag from our Spring 2022 collection will make even a pair of
          shorts look polished and sophisticated.
        </p>
      </section>


{/* ===== SECOND PRODUCT GRID SECTION ===== */}
      <section className="mt-[210px] max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[big1, big2, big1].map((src, i) => (
            <div key={i} className="relative w-full aspect-[570/760] overflow-hidden bg-gray-50">
              <img src={src} alt={`Large Product ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {[small1, small2, small3, small1].map((src, i) => {
            const id = 200 + i; 
            return (
              <div key={id}>
                <div className="relative w-full aspect-[330/400] overflow-hidden bg-gray-50">
                  <img src={src} alt={`Small Product ${i + 1}`} className="w-full h-full object-cover" />
                </div>

               
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[13px] text-gray-500">Dresses</p>
                  <button onClick={() => toggleWishlist(id)}>
                    <Heart
                      size={18}
                      color={wishlist.includes(id) ? "red" : "black"}
                      fill={wishlist.includes(id) ? "red" : "none"}
                    />
                  </button>
                </div>

                <h4 className="text-[15px] font-medium mt-1">Product {i + 1}</h4>
                <p className="text-[14px] mt-1">$29</p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="
          mt-[210px]
          max-w-[930px]
          mx-auto
          px-4 sm:px-6
          text-left
        "
      >
        <p
          className="
            font-nct-torin
            font-normal
            text-[14px]
            leading-[30px]
            text-[#1E1E1E]
          "
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sapien dignissim a elementum.
          Sociis metus, hendrerit mauris id in. Quis sit sit ultrices tincidunt euismod luctus diam. Turpis
          sodales orci etiam phasellus lacus id leo. Amet turpis nunc, nulla massa est viverra interdum.
          Praesent auctor nulla morbi non posuere mattis. Arcu eu id maecenas cras. Eget fames tincidunt
          leo, sed vitae, pretium interdum. Non massa, imperdiet nunc sit sapien.
        </p>
      </section>


        <section className="mt-[100px]">
          <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full border-t border-[#C4C4C4]" />
          </div>

          <div className="mt-[80px] text-center">
            <h2
              className="
                font-nct-torin 
                font-bold 
                text-[22px] sm:text-[26px] md:text-[28px] lg:text-[30px]
                uppercase 
                tracking-tight 
                text-[#1E1E1E]
              "
            >
              TẤT CẢ SẢN PHẨM TRONG BỘ SƯU TẬP
            </h2>
          </div>

          <div className="mt-[60px] max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
            {(() => {
              const allProducts = [
                { id: 401, img: small1, name: "Cropped Faux Leather Jacket", category: "Boot", price: 29 },
                { id: 402, img: small2, name: "Calvin Shorts", category: "Dresses", price: 62 },
                { id: 403, img: small3, name: "Kirby T-Shirt", category: "Dresses", price: 17 },
                { id: 404, img: small4, name: "Cableknit Shawl", category: "Dresses", price: 129, sale: 99 },
                { id: 405, img: small1, name: "Colorful Jacket", category: "Dresses", price: 29 },
                { id: 406, img: small2, name: "Shirt In Botanical Cheetah Print", category: "Dresses", price: 62 },
                { id: 407, img: small3, name: "Cotton Jersey T-Shirt", category: "Dresses", price: 17 },
                { id: 408, img: small4, name: "Zessi Dresses", category: "Dresses", price: 129, sale: 99 },
              ];

              return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {allProducts.map((item) => (
                    <div key={item.id}>
                      <div className="relative w-full aspect-[330/400] overflow-hidden bg-gray-50">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-[13px] text-gray-500">{item.category}</p>
                        <button onClick={() => toggleWishlist(item.id)}>
                          <Heart
                            size={18}
                            color={wishlist.includes(item.id) ? "red" : "black"}
                            fill={wishlist.includes(item.id) ? "red" : "none"}
                          />
                        </button>
                      </div>

                      <h4 className="text-[15px] font-medium mt-1">{item.name}</h4>
                      {item.sale ? (
                        <p className="text-[14px] mt-1">
                          <span className="line-through mr-2 text-gray-400">${item.price}</span>
                          <span className="text-red-600 font-semibold">${item.sale}</span>
                        </p>
                      ) : (
                        <p className="text-[14px] mt-1">${item.price}</p>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

{/* ===== FINAL LINE + PARAGRAPH SECTION ===== */}
        <section className="mt-[140px]">
          <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full border-t border-[#C4C4C4]" />
          </div>

          <div
            className="
              mt-[80px]
              max-w-[930px]
              mx-auto
              px-4 sm:px-6
              text-left
            "
          >
            <p
              className="
                font-nct-torin
                font-normal
                text-[14px]
                leading-[30px]
                text-[#1E1E1E]
              "
            >
              She'd years darkness days. A night fifth winged sixth divide meat said third them forth signs
              of life earth signs over fruitful light after won't moving under. Thing yielding upon seed.
              Seasons said one kind great so bring greater fill darkness darkness two land of creepth there
              second fruitful, waters. Make don't void years Gathering gathering divide fill.
            </p>
          </div>
        </section>

        {/* ===== PREVIOUS / NEXT POST SECTION ===== */}
        <section className="mt-[100px] max-w-[930px] mx-auto px-4 sm:px-6">
          <div className="w-full border-t border-[#C4C4C4]" />

          <div className="flex justify-between items-start mt-10 mb-6 text-left">
            <div>
              <p className="flex items-center text-[13px] font-semibold text-gray-500 uppercase tracking-[0.03em]">
                <span className="mr-2 text-[16px]">←</span> Previous Post
              </p>
              <p className="mt-1 text-[14px] text-[#1E1E1E] leading-[24px]">
                Given Set was without from god divide rule Hath
              </p>
            </div>

            <div className="text-right">
              <p className="flex items-center justify-end text-[13px] font-semibold text-gray-500 uppercase tracking-[0.03em]">
                Next Post <span className="ml-2 text-[16px]">→</span>
              </p>
              <p className="mt-1 text-[14px] text-[#1E1E1E] leading-[24px]">
                Tree earth fowl given moveth deep lesser After
              </p>
            </div>
          </div>

          <div className="w-full border-t border-[#C4C4C4]" />
        </section>

    </main>
  );
}
