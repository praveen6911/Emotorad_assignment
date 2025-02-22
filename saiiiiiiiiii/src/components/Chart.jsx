import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "../styles/Chart.css";

const data = [
  { name: "Week 1", Guest: 400, User: 300 },
  { name: "Week 2", Guest: 300, User: 400 },
  { name: "Week 3", Guest: 100, User: 200 },
  { name: "Week 4", Guest: 400, User: 300 },
];

const Chart = () => {
  return (
    <div className="chart">
      <h3>Activities</h3>
      <BarChart width={400} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Guest" fill="red" />
        <Bar dataKey="User" fill="green" />
      </BarChart>
    </div>
  );
};

export default Chart;
