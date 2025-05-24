"use client";
import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const HomePageChart = () => {
  // Sample data for the charts
  const salesData = [
    { name: "Jan", Sales: 4000 },
    { name: "Feb", Sales: 3000 },
    { name: "Mar", Sales: 5000 },
    { name: "Apr", Sales: 6000 },
    { name: "May", Sales: 8000 },
    { name: "Jun", Sales: 7000 },
    { name: "Jul", Sales: 9000 },
  ];

  const categoryData = [
    { name: "Electronics", Sales: 3000 },
    { name: "Clothing", Sales: 5000 },
    { name: "Home Appliances", Sales: 4000 },
    { name: "Books", Sales: 2000 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Chart 1: Sales Performance Over Time */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Sales Performance Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <Area
              type="monotone"
              dataKey="Sales"
              stroke="#3182CE"
              fill="#3182CE"
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Product Category Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Product Category Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Sales" fill="#34D399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HomePageChart;
