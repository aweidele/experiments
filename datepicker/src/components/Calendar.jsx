import { useContext } from "react";
import { DateContext } from "./SelectedDateContext";

import { getDaysInMonth, getMDY } from "../util/dates";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const colStart = ["col-start-1", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7"];

export function Calendar({ date }) {
  const { selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate } = useContext(DateContext);
  const [m, d, y] = getMDY(date);
  const daysInMonth = getDaysInMonth(date);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const getClassName = (thisDay) => {
    const thisDate = new Date(y, m, thisDay);
    const [thisTime, startTime, endTime] = [thisDate.getTime(), selectedStartDate ? selectedStartDate.getTime() : null, selectedEndDate ? selectedEndDate.getTime() : null];
    console.log(thisTime, startTime, endTime);
    const classes = [];
    if (thisTime === startTime || thisTime === endTime || (startTime && endTime && thisTime > startTime && thisTime < endTime)) {
      classes.push("bg-sky-400");
    }

    if (thisTime === startTime && !endTime) {
      classes.push("rounded-full");
    }

    if (thisTime === startTime && endTime) {
      classes.push("rounded-l-full");
    }

    if (thisTime === endTime) {
      classes.push("rounded-r-full");
    }

    return ` ${classes.join(" ")}`;
  };

  const handleDateClick = (thisDay) => {
    const thisDate = new Date(y, m, thisDay);

    if (selectedStartDate === null) {
      setSelectedStartDate(thisDate);
    }

    if (selectedStartDate && selectedEndDate === null && thisDate.getTime() > selectedStartDate.getTime()) {
      setSelectedEndDate(thisDate);
    }
  };

  return (
    <div>
      <h4 className="text-center">
        {months[m]} {y}
      </h4>
      <div className="grid grid-cols-7 w-full gap-y-1">
        <div className="font-bold text-center">S</div>
        <div className="font-bold text-center">M</div>
        <div className="font-bold text-center">T</div>
        <div className="font-bold text-center">W</div>
        <div className="font-bold text-center">T</div>
        <div className="font-bold text-center">F</div>
        <div className="font-bold text-center">S</div>
        {days.map((d) => (
          <div
            key={d}
            className={`aspect-square text-center${d === 1 ? ` ${colStart[firstOfMonth]}` : ""}${getClassName(d)}`}
            onClick={() => {
              handleDateClick(d);
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
