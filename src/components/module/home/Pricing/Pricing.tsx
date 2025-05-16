import React from "react";
import SectionTitle from "../../SectionTitle";

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "Access to introductory research courses",
      "Community support",
      "Basic research methodology lessons",
    ],
    buttonText: "Enroll for free",
  },
  {
    name: "Pro",
    price: "$24.90",
    duration: "/month",
    features: [
      "Access to intermediate research courses",
      "Priority Q&A sessions",
      "Advanced research methodology",
      "Collaboration with peers",
    ],
    buttonText: "Start learning",
  },
  {
    name: "Expert",
    price: "$49.90",
    duration: "/month",
    features: [
      "Access to all research courses",
      "One-on-one mentoring",
      "AI-powered research assistant",
      "Collaboration with experts",
      "24/7 expert support",
    ],
    buttonText: "Join now",
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container w-[90%]  py-8 mx-auto">
      <SectionTitle title="Our Upcomming Courses" discription="Explore diverse courses to enhance your skills and knowledge across various fields."/>
        <div className="flex flex-col items-center justify-center space-y-8 lg:mt-11 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-900 dark:border-gray-700"
            >
              <div className="flex-shrink-0">
                <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-blue-400 uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                  {plan.name}
                </h2>
              </div>

              <div className="flex-shrink-0">
                <span className="pt-2 text-3xl font-bold text-gray-800 uppercase dark:text-gray-100">
                  {plan.price}
                </span>
                {plan.duration && (
                  <span className="text-gray-500 dark:text-gray-400">{plan.duration}</span>
                )}
              </div>

              <ul className="flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-gray-500 dark:text-gray-400">
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="inline-flex items-center justify-center px-4 py-2 font-medium text-white uppercase transition-colors bg-[#bc986b] rounded-lg hover:bg-[#bc976b7b] focus:outline-none">
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
