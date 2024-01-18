import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DataGraph = ({ data, filters }) => {
  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    return (filters.serverName ? item.serverName === filters.serverName : true) &&
           (filters.serviceName ? item.serviceName === filters.serviceName : true) &&
           (!filters.startDate || itemDate >= filters.startDate) &&
           (!filters.endDate || itemDate <= filters.endDate);
  });
  return (
    <LineChart
      width={1000}
      height={500}
      data={filteredData}
      // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis label={{ value: 'Metric Ton CO2 Emission', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="co2Emission"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default DataGraph;
