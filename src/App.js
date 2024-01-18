import './App.css';
import DataGraph from './components/DataGraph';
import FileUpload from './components/FileUpload';
import CustomDateRangePicker from './components/DateRangePicker';
import React, { useState, useEffect } from 'react';


function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    serverName: '',
    serviceName: '',
    startDate: null,
    endDate: null
  });
  const [serverNames, setServerNames] = useState([]);
  const [serviceNames, setServiceNames] = useState([]);
  const emissionFactor = 0.01; // Change the Current Emssion Factor for the region.

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = JSON.parse(e.target.result);
      const processedData = fileData.data.map(item => ({
        ...item,
        co2Emission: calculateCO2Emission(item.kilowattHour, item.upTime)
      }));
      setData(processedData);
    };
    reader.readAsText(file);
  };

  console.log(data, " data data")
  const calculateCO2Emission = (kilowattHour, upTime) => {
    // Replace this with your actual calculation logic
    return kilowattHour * upTime * emissionFactor;
  };

  useEffect(() => {
    // Populate serverNames and serviceNames based on data
    setServerNames([...new Set(data.map(item => item.serverName))]);
    setServiceNames([...new Set(data.map(item => item.serviceName))]);
  }, [data]);

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const handleDateChange = (startDate, endDate) => {
    setFilters({ ...filters, startDate, endDate });
  };


  return (
    <div className="App">
      <h1>CO2 Emission Visualization Dashboard</h1>
      <p>Please Upload the Data File to visualise the Emission</p>
      <FileUpload onFileSelect={handleFileSelect} />
      
      <div className='filters'>
        <select onChange={e => handleFilterChange('serverName', e.target.value)}>
          <option value="">Select Server</option>
          {serverNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <select onChange={e => handleFilterChange('serviceName', e.target.value)}>
          <option value="">Select Service</option>
          {serviceNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <br></br>
        <CustomDateRangePicker onDatesChange={handleDateChange} />
      </div>
      <div className="graph-container">
      <DataGraph className='DateRangePicker' data={data} filters={filters} />
      </div>
    </div>
  );
}

export default App;