import React from "react";
import { FaUser, FaMoneyCheckAlt, FaClipboardList, FaTags, FaTools } from "react-icons/fa";
import "./style.css";

const Panel: React.FC = () => {
  const cards = [
    { type: "Pompistes", color: "bg-green-200", icon: <FaUser className="w-12 h-12 text-green-500" /> },
    { type: "Clients", color: "bg-yellow-200", icon: <FaMoneyCheckAlt className="w-12 h-12 text-yellow-500" /> },
    { type: " Conversion", color: "bg-red-200", icon: <FaClipboardList className="w-12 h-12 text-red-500" /> },
    { type: "Coupon", color: "bg-purple-200", icon: <FaTags className="w-12 h-12 text-purple-500" /> },
    { type: "Service", color: "bg-indigo-200", icon: <FaTools className="w-12 h-12 text-indigo-500" /> }
  ];

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
        Panel
      </h1>

      <div className="flex gap-2 items-center justify-around flex-wrap">
        {cards.map((card, index) => (
          <div key={index} className="w-64">
            <div className={`${card.color} p-4 rounded-md flex`}>
              <div className="flex items-center justify-center h-32 p-10 rounded-xl">
                <h1 className="font-bold text-6xl">{index + 1}</h1>
              </div>
              <div className="p-4">
                <p className="text-xl font-semibold">{card.type}</p>
                <div className="flex items-center justify-center mt-4">
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panel;
