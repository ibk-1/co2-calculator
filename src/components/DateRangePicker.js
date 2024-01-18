import React, { useState } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const CustomDateRangePicker = ({ onDatesChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    onDatesChange(startDate, endDate);
  };

  const isOutsideRange = () => false;


  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="start_date_id"
      endDate={endDate}
      endDateId="end_date_id"
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput}
      onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      isOutsideRange={isOutsideRange}
    />
  );
};

export default CustomDateRangePicker;
