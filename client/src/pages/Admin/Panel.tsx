import React, { useEffect, useState } from "react";
import { RiUser3Line, RiClipboardLine, RiCoupon2Line, RiToolsLine, RiStarLine } from 'react-icons/ri';
import { LiaChargingStationSolid } from "react-icons/lia";
import "./style.css";
import ChartComponent from "../../components/data/ChartBar";
import ReviewsChart from "../../components/data/ChartPolar";
import { chartData, reviewsData } from '../../mock/statistics'
import {  axiosNoAuth } from "../../lib/AxiosBase";

const Panel: React.FC = () => {
 
  const [countData , setCountData] = useState<any>(null)
 
  useEffect(() => {
    axiosNoAuth.get('/statistics/countDocs')
      .then(response => {
        console.log(response)
        setCountData(response.data);
      })
      .catch(error => {
        console.error('Error fetching count data:', error);
      });
  }, []);

  const cards = [
    { type: "Pompistes", color: "bg-green-200", icon: <LiaChargingStationSolid className="w-8 h-8 text-green-600" />, count: countData?.pompistesCount },
    { type: "Clients", color: "bg-yellow-200", icon: <RiUser3Line className="w-8 h-8 text-yellow-600" />, count: countData?.clientsCount },
    { type: "Conversion", color: "bg-red-200", icon: <RiClipboardLine className="w-8 h-8 text-red-600" />, count: countData?.conversionsCount },
    { type: "Coupon", color: "bg-purple-200", icon: <RiCoupon2Line className="w-8 h-8 text-purple-600" />, count: countData?.couponsCount },
    { type: "Service", color: "bg-indigo-200", icon: <RiToolsLine className="w-8 h-8 text-indigo-600" />, count: countData?.servicesCount },
    { type: "Reviews", color: "bg-pink-200", icon: <RiStarLine className="w-8 h-8 text-pink-600" />, count: countData?.reviewsCount }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Panel</h1>
      <div className="flex gap-4 items-center justify-around flex-wrap">
        {cards.map((card, index) => (
          <div key={index} className="w-56 card">
            <div className={`${card.color} p-2 rounded-md flex items-center justify-between shadow-md relative transition duration-300 ease-in-out transform hover:scale-105`}>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-md">
                <h1 className="font-bold text-xl text-gray-700">{card.count}</h1>
              </div>
              <div className="p-2">
                <p className="text-sm font-semibold">{card.type}</p>
                <div className="flex items-center justify-center mt-1">
                  {card.icon}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-color"></div>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-4xl font-bold mb-8 mt-8">Statistique</h1>
      <div className="flex flex-wrap gap-4 justify-evenly">
        <div className="chart-container mt-8 ">
          {chartData && <ChartComponent data={chartData} />}
        </div>
        <div className="chart-container mt-8 ">
          <ReviewsChart data={reviewsData} />
        </div>
      </div>
    </div>
  );
};

export default Panel;
