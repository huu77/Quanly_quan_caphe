import { useState } from "react";
import { format } from "date-fns";
import { addDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { vi } from "date-fns/locale";


const DayPickerCompoment = ({ setDataDay }) => {
 
  const [range, setRange] = useState(new Date());

  const handleDayClick = (range) => {
    if (range) {
      setDataDay(format(new Date(range), 'yyyy-MM-dd'));
    }
    setRange(range);
  };

  return (
    <DayPicker
      numberOfMonths={1}
      pagedNavigation
      onSelect={handleDayClick}
      mode="single"
      selected={range}
      locale={vi}
      className="my-day-picker"
    />
  );
};

export default DayPickerCompoment;
