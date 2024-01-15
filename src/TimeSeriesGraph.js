import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import jsonData from './sample.json'; // Adjust the path as necessary

const TimeSeriesGraph = () => {
  const [serverName, setServerName] = useState('All');
  const [serviceName, setServiceName] = useState('All');
  const [month, setMonth] = useState('All');
  const [graphData, setGraphData] = useState({});

  const CO2_CONVERSION_FACTOR = 0.0001; // Example conversion factor

  useEffect(() => {
    if (jsonData && Array.isArray(jsonData.data)) {
      const filteredData = jsonData.data
        .filter(item => (serverName === 'All' || item.serverName === serverName) &&
                        (serviceName === 'All' || item.serviceName === serviceName) &&
                        (month === 'All' || new Date(item.date).getMonth() === (parseInt(month) - 1)))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

        console.log(filteredData, " Filtered");

        const groupedData = filteredData.reduce((acc, item) => {
            // Ensure kilowattHour and upTime are numbers, default to 0 if not
            const kilowattHour = isNaN(item.kilowattHour) ? 0 : item.kilowattHour;
            const upTime = isNaN(item.upTime) ? 0 : item.upTime;
          
            const emission = kilowattHour * upTime * CO2_CONVERSION_FACTOR;
            const itemDate = new Date(item.date);
          
            // Check if the date is valid
            if (isNaN(itemDate.getTime())) {
              // If the date is invalid, skip this entry
              return acc;
            }
          
            const month = itemDate.getMonth() + 1;
            const year = itemDate.getFullYear();
            const key = `${month}/${year}`;
          
            if (!acc[key]) {
              acc[key] = emission;
            } else {
              acc[key] += emission;
            }
            return acc;
          }, {});
          

      console.log(groupedData)
      const chartData = {
        labels: Object.keys(groupedData),
        datasets: [
          {
            label: 'CO2 Emissions (Metric Tons)',
            data: Object.values(groupedData),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };

      console.log(chartData, "CD")
      setGraphData(chartData);
      graphData = chartData
    } else {
      console.error('jsonData.data is undefined or not an array');
    }

    console.log(graphData, "Data ----- Data")

  }, [serverName, serviceName, month]);

  useEffect(() => {
    console.log(graphData, "Data ----- Data");
  }, [graphData]);
  


  const serverNames = jsonData && Array.isArray(jsonData.data) ? 
                      Array.from(new Set(jsonData.data.map(item => item.serverName))) : [];
  const serviceNames = jsonData && Array.isArray(jsonData.data) ? 
                       Array.from(new Set(jsonData.data.map(item => item.serviceName))) : [];

  return (
    <div>
      <h2>CO2 Emissions Over Time</h2>
      <div>
        <label>Server Name: </label>
        <select value={serverName} onChange={e => setServerName(e.target.value)}>
          <option value="All">All</option>
          {serverNames.map(name => <option key={name} value={name}>{name}</option>)}
        </select>

        <label>Service Name: </label>
        <select value={serviceName} onChange={e => setServiceName(e.target.value)}>
          <option value="All">All</option>
          {serviceNames.map(name => <option key={name} value={name}>{name}</option>)}
        </select>

        <label>Month: </label>
        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option value="All">All</option>
          {[...Array(12).keys()].map(m => (
            <option key={m} value={m + 1}>{m + 1}</option>
          ))}
        </select>
      </div>
      <Line data={graphData} />
    </div>
  );
};

export default TimeSeriesGraph;
