import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export const ActivitiesChart = ({ data }) => (
  <div className="chart-container">
    <h3 className="chart-title">Activities</h3>
    <p className="chart-subtitle">May - June 2021</p>
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          barSize={40} 
          barGap={5}
          margin={{ top: 10, right: 50, left: 35, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="5 5" vertical={false} />
          <XAxis 
            dataKey="week" 
            tickLine={true}
            axisLine={true}
            tick={{ fontSize: 15 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis 
            tickLine={true}
            axisLine={true}
            tick={{ fontSize: 12 }}
          />
          <Bar dataKey="User" fill="#9af01a" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Guest" fill="#fa1134" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);