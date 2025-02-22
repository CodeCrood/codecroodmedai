import React from "react";
import { BarChart2, Activity, CheckCircle, AlertTriangle } from "lucide-react";

function QuickStats() {
  const stats = [
    {
      icon: <BarChart2 className="text-blue-500 w-8 h-8" />, 
      label: "Images Processed",
      value: 1240
    },
    {
      icon: <Activity className="text-green-500 w-8 h-8" />,
      label: "Successful Segmentations",
      value: 980
    },
    {
      icon: <CheckCircle className="text-teal-500 w-8 h-8" />,
      label: "Accuracy Rate",
      value: "92%"
    },
    {
      icon: <AlertTriangle className="text-red-500 w-8 h-8" />,
      label: "Errors Detected",
      value: 35
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white rounded-2xl shadow-lg">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-105"
        >
          <div>{stat.icon}</div>
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-700">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuickStats;
