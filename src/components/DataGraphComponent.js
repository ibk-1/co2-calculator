import React, { useState } from 'react';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataGraphComponent = () => {
  const [data, setData] = useState([]);
  const [viewBy, setViewBy] = useState('Hardware Vendor'); // Default view

  // Function to handle file change and parse CSV
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true, // Automatically convert numbers
        complete: (results) => {
          const rawData = results.data;
          const processedData = rawData.map(row => ({
            ...row,
            CO2Emission: row.KWh * row['Emission Factor']
          }));
          
          setData(processedData);
        }
      });
    }
  };

  // Aggregate data based on the current view (by 'Hardware Vendor', 'Country', or both)
  const aggregateData = () => {
    const aggregation = {};
    data.forEach(row => {
      const key = viewBy === 'Both' ? `${row['Hardware Vendor']} - ${row.Country}` : row[viewBy];
      if (!aggregation[key]) {
        aggregation[key] = { name: key, CO2Emission: 0 };
      }
      aggregation[key].CO2Emission += row.CO2Emission;
    });

    return Object.values(aggregation);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <select value={viewBy} onChange={(e) => setViewBy(e.target.value)}>
        <option value="Hardware Vendor">Hardware Vendor</option>
        <option value="Country">Country</option>
        <option value="Both">Both</option>
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={aggregateData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'CO2 Emissions (kg CO2)', angle: -90, position: 'center' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="CO2Emission" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataGraphComponent;
