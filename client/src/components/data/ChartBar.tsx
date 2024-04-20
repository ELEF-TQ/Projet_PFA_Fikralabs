import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ChartProps {
  data: any;
}

const ChartBar: React.FC<ChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: Chart<"bar"> | null = null;

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          },
        },
      });
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartBar;