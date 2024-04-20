import React, { useEffect, useState } from "react";
import { FaUser, FaMoneyCheckAlt, FaClipboardList, FaTags, FaTools } from "react-icons/fa";
import "./style.css";
import ChartComponent from "../../components/data/ChartBar";
import ReviewsChart from "../../components/data/ChartPolar";

const Panel: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [reviewsData, setReviewsData] = useState<number[]>([]);

  useEffect(() => {
    // Mock data for the chart
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Sample Data",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
          hoverBorderColor: "rgba(255, 99, 132, 1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    setChartData(data);

    // Mock data for reviews
    const reviews = [10, 25, 30, 45, 60, 55];
    setReviewsData(reviews);
  }, []);

  const cards = [
    { type: "Pompistes", color: "bg-green-200", icon: <FaUser className="w-8 h-8 text-green-500" /> },
    { type: "Clients", color: "bg-yellow-200", icon: <FaMoneyCheckAlt className="w-8 h-8 text-yellow-500" /> },
    { type: "Conversion", color: "bg-red-200", icon: <FaClipboardList className="w-8 h-8 text-red-500" /> },
    { type: "Coupon", color: "bg-purple-200", icon: <FaTags className="w-8 h-8 text-purple-500" /> },
    { type: "Service", color: "bg-indigo-200", icon: <FaTools className="w-8 h-8 text-indigo-500" /> }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Panel</h1>
      <div className="flex gap-4 items-center justify-around flex-wrap">
        {cards.map((card, index) => (
          <div key={index} className="w-56 card">
            <div className={`${card.color} p-2 rounded-md flex items-center justify-between shadow-md relative transition duration-300 ease-in-out transform hover:scale-105`}>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-md">
                <h1 className="font-bold text-xl text-gray-700">{index + 1}</h1>
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
