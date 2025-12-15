import { useState } from "react";

const getTimeDifference = (targetDate) => {
  let now = new Date();
  let target = new Date(targetDate);
  if (target < now) {
    return null;
  }

  let months = 0;

  while (true) {
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    if (nextMonth <= target) {
      now = nextMonth;
      months++;
    } else {
      break;
    }
  }

  const remainingDiff = target - now;
  const totalDays = Math.floor(remainingDiff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  const seconds = Math.floor(remainingDiff / 1000) % 60;
  const minutes = Math.floor(remainingDiff / (1000 * 60)) % 60;
  const hours = Math.floor(remainingDiff / (1000 * 60 * 60)) % 24;

  return { months, weeks, days, hours, minutes, seconds };
};

const TimeDiff = ({ diff }) => {
  console.log(diff);
  const { months, weeks, days, hours, minutes, seconds } = diff;

  return (
    <span style={{ display: "inline-flex", gap: "10px", textAlign: "center" }}>
      <span>
        {months}
        <br />
        Months
      </span>
      <span>
        {weeks}
        <br />
        Weeks
      </span>
      <span>
        {days}
        <br />
        Days
      </span>
      <span>
        {hours}
        <br />
        Hours
      </span>
      <span>
        {minutes}
        <br />
        Minutes
      </span>
      <span>
        {seconds}
        <br />
        Seconds
      </span>
    </span>
  );
};

function App() {
  const [date, setDate] = useState("");
  const [timeDiff, setTimeDiff] = useState(null);

  const handleChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    setTimeDiff(getTimeDifference(newDate));
  };
  return (
    <div className="wrapper">
      <input type="datetime-local" value={date} onChange={handleChange} />
      {date && <p>{date}</p>}
      {timeDiff && (
        <p>
          <strong>TimeDiff:</strong> <TimeDiff diff={timeDiff} />
        </p>
      )}
    </div>
  );
}

export default App;
