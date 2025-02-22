import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const ProductsChart = ({ data }) => (
  <div className="pie-chart-container">
    <h3 className="chart-title">Top Products</h3>
    <div className="pie-chart-content">
      <div className="pie-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={30}
              outerRadius={45}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="pie-chart-legend">
        {data.map((product, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: product.color }}></div>
            <div className="legend-text">
              <span className="legend-title">{product.name}</span>
              <span className="legend-value">{product.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);