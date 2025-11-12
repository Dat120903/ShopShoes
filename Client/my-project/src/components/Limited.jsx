import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Img1 from "../assets/img1.png";

const products = [
  { id: 1, category: "Dresses", name: "Hub Accent Mirror", price: 29, image: Img1 },
  { id: 2, category: "Dresses", name: "Hosking Blue Area Rug", price: 62, image: Img1 },
  { id: 3, category: "Dresses", name: "Hanneman Pouf", price: 17, image: Img1 },
  { id: 4, category: "Túi", name: "Cushion Futon Slipcover", price: 99, oldPrice: 129, image: Img1 },
];

export default function Limited() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <section className="mt-20">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
          DÀNH RIÊNG <span className="font-bold">CHO BẠN</span>
        </h2>

        <div className="relative">
          
          <button className="hidden md:flex absolute left-[-12px] top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10">
            <FaChevronLeft />
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="rounded-lg overflow-hidden bg-white">
                
                <div className="w-full aspect-[4/5]">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
               
                <div className="p-2">
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{p.category}</p>
                    <button onClick={() => toggleWishlist(p.id)} className="text-xl">
                      {wishlist.includes(p.id) ? (
                        <AiFillHeart className="text-red-600" />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </button>
                  </div>

                  <p className="mt-1 font-medium">{p.name}</p>

                  <div className="mt-1 flex gap-2 items-center">
                    {p.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">${p.oldPrice}</span>
                    )}
                    <span className={`font-semibold ${p.oldPrice ? "text-red-600" : "text-black"}`}>
                      ${p.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="hidden md:flex absolute right-[-12px] top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}


