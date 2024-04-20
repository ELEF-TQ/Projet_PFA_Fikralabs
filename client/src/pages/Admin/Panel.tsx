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
      <h1 className="text-4xl font-bold mb-8">Panel</h1>
      <div className="flex gap-2 items-center justify-around flex-wrap">
        {cards.map((card, index) => (
          <div key={index} className="w-64">
            <div className={`${card.color} p-4 rounded-md flex items-center justify-between shadow-2xl relative`}>
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-white shadow-2xl">
                <h1 className="font-bold text-4xl text-gray-700">{index + 1}</h1>
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold">{card.type}</p>
                <div className="flex items-center justify-center mt-2">
                  {card.icon}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-color"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panel;
