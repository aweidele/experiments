import { useContext } from "react";
import { DateContext } from "./SelectedDateContext";

import { getDaysInMonth, getMDY } from "../util/dates";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const colStart = ["col-start-1", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7"];

export function Calendar({ date }) {
  const { selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate, hoverEndDate, setHoverEndDate } = useContext(DateContext);
  const [m, d, y] = getMDY(date);
  const daysInMonth = getDaysInMonth(date);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const getClassName = (thisDay) => {
    const thisDate = new Date(y, m, thisDay);
    const [thisTime, startTime, endTime, hoverTime] = [thisDate.getTime(), selectedStartDate ? selectedStartDate.getTime() : null, selectedEndDate ? selectedEndDate.getTime() : null, hoverEndDate ? hoverEndDate.getTime() : null];

    const classes = [];
    if (thisTime === startTime || thisTime === endTime || (startTime && endTime && thisTime > startTime && thisTime < endTime)) {
      classes.push("bg-sky-400");
    }

    if (thisTime === startTime && (endTime || hoverTime)) {
      classes.push("rounded-l-full");
    }

    if (thisTime === endTime || (!endTime && thisTime === hoverTime)) {
      classes.push("rounded-r-full");
    }

    if (startTime && !endTime) {
      if (thisTime === startTime && !hoverTime) {
        classes.push("rounded-full");
      }

      if (thisTime > startTime && thisTime <= hoverTime) {
        classes.push("bg-sky-200");
      }
    }

    if (startTime && endTime && thisTime === hoverTime) {
      classes.push(`relative before:content-[""] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:border before:border-sky-800 before:rounded-full`);
    }

    return ` ${classes.join(" ")}`;
  };

  const handleDateClick = (thisDay) => {
    const thisDate = new Date(y, m, thisDay);
    const [thisTime, startTime, endTime] = [thisDate.getTime(), selectedStartDate ? selectedStartDate.getTime() : null, selectedEndDate ? selectedEndDate.getTime() : null];

    if (!startTime || thisTime < startTime) {
      setSelectedStartDate(thisDate);
    }

    if (startTime && thisTime >= startTime) {
      setSelectedEndDate(thisDate);
    }

    if (thisTime === startTime && startTime && (!endTime || endTime === startTime)) {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }

    if (thisTime === endTime) {
      setSelectedEndDate(null);
    }
  };

  const handleMouseEnter = (thisDay) => {
    const thisDate = new Date(y, m, thisDay);

    setHoverEndDate(thisDate);
  };

  const handleMouseLeave = () => {
    setHoverEndDate(null);
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
            onMouseEnter={() => {
              handleMouseEnter(d);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
