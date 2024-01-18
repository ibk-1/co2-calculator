import React from 'react';

const Filters = ({ data, onFilterChange }) => {
  // Extract unique values for filters
  const serverNames = [...new Set(data.map(item => item.serverName))];
  const serviceNames = [...new Set(data.map(item => item.serviceName))];
  const timePeriods = [...new Set(data.map(item => item.date))]; // Adjust as needed

  return (
    <div className="filters">
      <select onChange={e => onFilterChange('serverName', e.target.value)}>
        <option value="">Select Server</option>
        {serverNames.map(name => <option key={name} value={name}>{name}</option>)}
      </select>
      {/* Repeat for serviceName and timePeriod */}
    </div>
  );
};

export default Filters;
