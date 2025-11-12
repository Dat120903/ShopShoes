import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh] mt-[100px] px-4">
  
      <h1 className="text-[90px] sm:text-[120px] font-extrabold text-black tracking-tight">
        OOPS!
      </h1>

      
      <h2 className="text-[22px] sm:text-[26px] font-medium text-gray-800 mt-3">
        Page not found.
      </h2>

     
      <p className="max-w-[550px] text-[15px] sm:text-[16px] text-gray-600 mt-4 leading-relaxed">
        Sorry, we couldn’t find the page you were looking for. We suggest that
        you return to the home page.
      </p>

    
      <button
        onClick={() => navigate("/")}
        className="mt-10 bg-black text-white font-semibold text-[14px] uppercase px-12 py-4 hover:bg-gray-800 transition-all duration-200"
      >
        Go back
      </button>
    </section>
  );
};

export default NotFound;
