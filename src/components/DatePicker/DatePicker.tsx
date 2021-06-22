import React from 'react';
import Calendar from '../Calendar/Calendar';

const DatePicker: React.FC = () => {
  return (
    <>
      <Calendar
        date={null}
        onDateChanged={() => {
          console.log('d');
        }}
      />
    </>
  );
};

export default DatePicker;
