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
          maintainAspectRatio: false, // Ensure the chart fills its container
          plugins: {
            legend: {
              display: false, // Hide the legend
            },
          },
          scales: {
            x: {
              grid: {
                display: false, // Hide the x-axis grid lines
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                color: "rgba(0, 0, 0, 0.8)", // Set the color of the tick marks on the y-axis
              },
            },
          },
          elements: {
            bar: {
              borderWidth: 2,
              borderRadius: 2,
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

  // Generate an array of random colors
  const generateRandomColors = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };

  useEffect(() => {
    if (chartInstance && data.datasets) {
      const numBars = data.datasets[0].data.length;
      const randomColors = generateRandomColors(numBars);
      chartInstance.data.datasets?.forEach((dataset: any, index: number) => {
        dataset.backgroundColor = randomColors[index];
      });
      chartInstance.update();
    }
  }, [data]);

  return <canvas ref={chartRef} style={{ maxWidth: "100%" }} />;
};

export default ChartBar;
