import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const [pieData, setPieData] = useState({
    labels: ["Tumor", "Liver"],
    datasets: [
      {
        data: [31.41, 68.59], // Example values: Tumor 31.41%, Liver 68.59%
        backgroundColor: ["#ff6384", "#36a2eb"],
        hoverBackgroundColor: ["#ff6384", "#36a2eb"],
      },
    ],
  });

  // State to manage which part of the chart is being edited
  const [editing, setEditing] = useState(null);

  // Function to handle clicking and changing values
  const handleTextChange = (value, part) => {
    const updatedData = { ...pieData };
    const index = part === "Tumor" ? 0 : 1;
    
    // Update the clicked part of the chart
    updatedData.datasets[0].data[index] = parseFloat(value);

    // Update the other value to maintain the total as 100%
    updatedData.datasets[0].data[1 - index] = 100 - updatedData.datasets[0].data[index];

    setPieData(updatedData);
    setEditing(null); // Close the text input after editing
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50  ">
      <div className="flex justify-center">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center animate-pulse hover:text-blue-600 transition-all duration-300 ease-in-out">
      Liver vs Tumor Area</h2>
      </div>

      {/* Text to show current values and make them editable */}
      <div className="flex justify-center mt-4">
        <div className="mr-4">
          <h3 className="text-xl">
            Tumor:{" "}
            {editing === "Tumor" ? (
              <span>
                <input
                  type="number"
                  value={pieData.datasets[0].data[0]}
                  min="0"
                  max="100"
                  step="0.1"
                  onBlur={(e) => handleTextChange(e.target.value, "Tumor")}
                  autoFocus
                />
              </span>
            ) : (
              <span
                className="cursor-pointer text-black-500"
                onClick={() => setEditing("Tumor")}
              >
                {pieData.datasets[0].data[0].toFixed(2)}%
              </span>
            )}
          </h3>
        </div>
        <div>
          <h3 className="text-xl">
            Liver:{" "}
            {editing === "Liver" ? (
              <span>
                <input
                  type="number"
                  value={pieData.datasets[0].data[1]}
                  min="0"
                  max="100"
                  step="0.1"
                  onBlur={(e) => handleTextChange(e.target.value, "Liver")}
                  autoFocus
                />
              </span>
            ) : (
              <span
                className="cursor-pointer text-black-500"
                onClick={() => setEditing("Liver")}
              >
                {pieData.datasets[0].data[1].toFixed(2)}%
              </span>
            )}
          </h3>
        </div>
      </div>

      {/* Pie chart */}
      <div className="mt-6 p-4 bg-white rounded shadow">
        <Pie
          data={pieData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom", // Legend is positioned at the bottom
              },
            },
            maintainAspectRatio: false,
          }}
          height={450} // Adjust height as needed
          width={450}  // Adjust width as needed
        />
      </div>
    </div>
  );
}

export default PieChart;
