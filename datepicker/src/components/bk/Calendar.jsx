import { getDaysInMonth, getMDY } from "../util/dates";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const colStart = ["col-start-1", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7"];

export function Calendar({ date }) {
  // const { selectedStartDate } = useContext(SelectedDateContext);
  const [m, d, y] = getMDY(date);
  const daysInMonth = getDaysInMonth(date);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  return (
    <div>
      <h4 className="text-center">
        {months[m]} {y}
      </h4>
      <div className="grid grid-cols-7 w-full">
        <div className="font-bold">S</div>
        <div className="font-bold">M</div>
        <div className="font-bold">T</div>
        <div className="font-bold">W</div>
        <div className="font-bold">T</div>
        <div className="font-bold">F</div>
        <div className="font-bold">S</div>
        {days.map((d) => (
          <div key={d} className={`${d === 1 ? colStart[firstOfMonth] : ""}`}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
