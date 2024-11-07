import { useContext, useState } from "react";
import { DateContext } from "./SelectedDateContext";
import { Calendar } from "./Calendar";
import { getMDY } from "../util/dates";

export function Datepicker() {
  const { selectedStartDate, selectedEndDate, hoverEndDate } = useContext(DateContext);

  const [calendarStart, setCalendarStart] = useState(new Date());
  const [m, d, y] = getMDY(calendarStart);

  const formatDate = (thisDate) => (thisDate ? `${thisDate.getMonth() + 1}/${thisDate.getDate()}/${thisDate.getFullYear()}` : "");

  const handleMonthNext = (dir) => {
    const newCalendarStart = new Date(y, m + dir, 1);
    setCalendarStart(newCalendarStart);
  };

  return (
    <div className="relative">
      <button onClick={() => handleMonthNext(-1)}>Prev</button>
      <button onClick={() => handleMonthNext(1)}>Next</button>

      <div className="flex gap-2">
        <div className="flex-1">
          <input type="text" className="w-full block border p-2" value={formatDate(selectedStartDate)} />
        </div>
        <div className="flex-1">
          <input type="text" className="w-full block border p-2" value={formatDate(selectedEndDate)} />
        </div>
      </div>
      <div className="absolute top-full flex gap-2 w-full">
        <div className="flex-1 p-3">
          <Calendar date={calendarStart} />
        </div>
        <div className="flex-1 p-3">
          <Calendar date={new Date(y, m + 1, 1)} />
        </div>
      </div>

      {hoverEndDate && <div className="fixed right-0 bottom-0 p-2">{formatDate(hoverEndDate)}</div>}
    </div>
  );
}
