import { useState, useContext } from "react";
import { Calendar } from "./Calendar";
import { getMDY } from "../util/dates";
import { SelectedDateContext, DateContext } from "./SelectedDateContext";

export function Datepicker() {
  const [calendarStart, setCalendarStart] = useState(new Date());
  const [m, d, y] = getMDY(calendarStart);

  const handleMonthNext = (dir) => {
    const newCalendarStart = new Date(y, m + dir, 1);
    setCalendarStart(newCalendarStart);
  };

  // const {}

  return (
    <div className="relative">
      <button onClick={() => handleMonthNext(-1)}>Prev</button>
      <button onClick={() => handleMonthNext(1)}>Next</button>
      <SelectedDateContext>
        <div className="flex gap-2">
          <div className="flex-1">
            <input type="text" className="w-full block border p-2" />
          </div>
          <div className="flex-1">
            <input type="text" className="w-full block border p-2" />
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
      </SelectedDateContext>
    </div>
  );
}
