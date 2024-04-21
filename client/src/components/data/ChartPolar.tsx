import { ChartOptions } from "chart.js";
import React from "react";
import { PolarArea } from "react-chartjs-2";

interface ReviewsChartProps {
  data: number[];
}

const ChartPolar: React.FC<ReviewsChartProps> = ({ data }) => {
  const chartData = {
    labels: ["0 Stars", "1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Reviews",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)"
        ],
        borderWidth: 1
      }
    ]
  };
  const chartOptions: ChartOptions<'polarArea'> = {
    plugins: {
      legend: {
        display: false, // Hide legend
      }
    },
    scales: {
      r: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Set grid color
        },
        ticks: {
          color: "black", // Set tick color
        },
      },
    },
  };

  const colorMeanings = [
    "rgba(255, 99, 132, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 205, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(153, 102, 255, 1)"
  ];

  return (
    <div>
      <PolarArea data={chartData} options={chartOptions} />
      <div className="flex justify-center mt-4">
        {colorMeanings.map((color, index) => (
          <div key={index} className="mr-4">
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartPolar;
