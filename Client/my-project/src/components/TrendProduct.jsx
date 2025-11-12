import Img1 from '../assets/img1.png';
import { useState } from "react";
import { Heart } from "lucide-react";

const products = [
  { id: 1, name: "Cropped Faux Leather Jacket", category: "Boot", price: "$29", oldPrice: null, image: Img1 },
  { id: 2, name: "Sandal", category: "Sandal", price: "$29", oldPrice: null, image: Img1 },
  { id: 3, name: "Kirby T-Shirt", category: "Guốc", price: "$17", oldPrice: null, image: Img1 },
  { id: 4, name: "Cableknit Shawl", category: "Dép", price: "$99", oldPrice: "$129", image: Img1 },
  { id: 5, name: "Colorful Jacket", category: "Sandal", price: "$29", oldPrice: null, image: Img1 },
  { id: 6, name: "Shirt In Botanical Cheetah Print", category: "Sandal", price: "$62", oldPrice: null, image: Img1 },
  { id: 7, name: "Cotton Jersey T-Shirt", category: "Sandal", price: "$17", oldPrice: null, image: Img1 },
  { id: 8, name: "Zessi Dresses", category: "Sandal", price: "$99", oldPrice: "$129", image: Img1 },
];

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="w-full aspect-[3/4] overflow-hidden rounded-md bg-gray-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{product.category}</p>
          <button onClick={() => setLiked((s) => !s)} aria-label="like">
            <Heart
              size={18}
              className={liked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-gray-600"}
            />
          </button>
        </div>

        <h3 className="text-base font-medium text-gray-900">{product.name}</h3>

        <div className="flex items-center gap-2">
          {product.oldPrice && (
            <span className="text-sm line-through text-gray-400">{product.oldPrice}</span>
          )}
          <span className={`text-base font-semibold ${product.oldPrice ? "text-red-600" : "text-gray-900"}`}>
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TrendProduct() {
  const [activeTab, setActiveTab] = useState("Mới nhất");
  const tabs = ["Tất cả", "Mới nhất", "Bán chạy nhất", "Được quan tâm nhất"];

  return (
    <section className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 mt-27">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 uppercase tracking-wide">
        SẢN PHẨM <span className="font-normal">&</span> XU HƯỚNG
      </h2>

      <div className="flex gap-6 justify-center mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm sm:text-base md:text-lg font-medium tracking-wide ${
              activeTab === tab ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="underline decoration-2 underline-offset-4 text-sm sm:text-base font-semibold">
          XEM TẤT CẢ SẢN PHẨM
        </button>
      </div>
    </section>
  );
}
