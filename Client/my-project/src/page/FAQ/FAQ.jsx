import React, { useState } from "react";

const FAQSection = ({ title, questions }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mb-12">
      <h2 className="text-[24px] sm:text-[26px] font-semibold mb-4">{title}</h2>

      <div className="border-t border-gray-300">
        {questions.map((q, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full flex justify-between items-center py-4 text-left font-semibold text-[16px] hover:text-[#206973] transition-colors"
            >
              <span>{q.question}</span>
              <span
                className={`text-[22px] font-semibold text-black ${
                  openIndex === index ? "translate-y-[-1px]" : ""
                }`}
              >
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="pb-6 text-[15px] text-gray-900 leading-relaxed">
                {q.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQ = () => {
  const orders = [
    {
      question: "Bring of had which their whose you're it own?",
      answer:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
    },
    {
      question: "Over shall air can't subdue fly divide him?",
      answer:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    },
    {
      question: "Waters one you'll creeping?",
      answer:
        "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
  ];

  const shipping = [
    {
      question: "Bring of had which their whose you're it own?",
      answer:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
    },
    {
      question: "Over shall air can't subdue fly divide him?",
      answer:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
    {
      question: "Waters one you'll creeping?",
      answer:
        "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
  ];

  const payment = [
    {
      question: "Bring of had which their whose you're it own?",
      answer:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
    },
    {
      question: "Over shall air can't subdue fly divide him?",
      answer:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
    {
      question: "Waters one you'll creeping?",
      answer:
        "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
  ];

  return (
    <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 mt-[140px] mb-[100px]">
      <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold uppercase mb-12 text-left leading-[110%]">
        Frequently Asked Questions
      </h1>

      <FAQSection title="Orders" questions={orders} />
      <FAQSection title="Shipping" questions={shipping} />
      <FAQSection title="Payment" questions={payment} />
    </section>
  );
};

export default FAQ;
