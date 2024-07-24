import { useState } from "react";
import { format } from "date-fns";
import { addDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { vi } from "date-fns/locale";


const DayPickerCompoment = ({ setDataDay }) => {
  const initialRange = {
    from: new Date(),
    to: addDays(new Date(), 1),
  };

  const [range, setRange] = useState(initialRange);

  const handleDayClick = (range) => {
    console.log(range)
    if (range?.from && range?.to) {
      setDataDay({startday:format(new Date(range?.from), 'dd/MM/yyyy') ,enday:format(new Date(range?.to), 'dd/MM/yyyy')})
    }
    setRange(range);
  };

  return (
    <DayPicker
      numberOfMonths={1}
      pagedNavigation
      onSelect={handleDayClick}
      mode="range"
      selected={range}
      locale={vi}
      className="my-day-picker"
    />
  );
};

export default DayPickerCompoment;
