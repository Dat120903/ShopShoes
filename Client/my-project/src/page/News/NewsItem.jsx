import React from "react";
import { Link } from "react-router-dom";

const NewsItem = ({ image, title, date, desc, id }) => {
  return (
    <div className="w-full">
      <div className="w-full aspect-[690/500] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="mt-4">
        <p className="text-[12px] uppercase text-gray-500 tracking-wider">
          By Admin &nbsp; | &nbsp; {date}
        </p>
        <h3 className="text-[20px] font-medium mt-1">{title}</h3>
        <p className="text-[15px] text-gray-600 mt-2 leading-relaxed">
          {desc}
        </p>
        <Link
          to={`/news/${id}`}
          className="mt-3 inline-block text-[13px] font-semibold uppercase underline underline-offset-4 decoration-2 hover:text-gray-800"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
