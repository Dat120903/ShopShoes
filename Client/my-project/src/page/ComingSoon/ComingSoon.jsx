import React, { useEffect, useState } from "react";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 7,
    minutes: 9,
    seconds: 3,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else clearInterval(timer);

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh] mt-[120px] px-4">
      <h1 className="text-[60px] sm:text-[90px] font-extrabold text-black uppercase tracking-tight">
        Coming Soon
      </h1>

      <p className="max-w-[600px] text-gray-700 text-[15px] sm:text-[16px] mt-4 leading-relaxed">
        Sorry, we couldn’t find the page you were looking for. We suggest that
        you return to the home page.
      </p>

      <div className="flex justify-center items-center gap-6 sm:gap-10 mt-10">
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HOURS", value: timeLeft.hours },
          { label: "MINS", value: timeLeft.minutes },
          { label: "SEC", value: timeLeft.seconds },
        ].map((item, index) => (
          <div key={index} className="text-center">
            <p className="text-[30px] sm:text-[36px] font-semibold text-black">
              {String(item.value).padStart(2, "0")}
            </p>
            <p className="text-[13px] sm:text-[14px] font-semibold text-gray-500 mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center mt-10 w-full max-w-[650px]">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full border border-gray-300 px-4 py-3 text-[15px] outline-none focus:border-black"
        />
        <button className="mt-4 sm:mt-0 sm:ml-3 bg-black text-white px-10 py-3 font-semibold uppercase hover:bg-gray-800 transition-all duration-200">
          Join
        </button>
      </div>
    </section>
  );
};

export default ComingSoon;
