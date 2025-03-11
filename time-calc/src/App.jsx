import { useState } from "react";

function App() {
  const [times, setTimes] = useState(["0"]);

  const handleChange = (val, index) => {
    const newTimes = [...times];
    newTimes[index] = val;
    if (newTimes.length === index + 1) {
      newTimes.push("");
    }
    setTimes(newTimes);
  };

  const timeSum = () => {
    let totalH = 0;
    let totalM = 0;

    times.forEach((time) => {
      // if (time.includes(":")) {
      if (time) {
        const [h, m] = time.split(":").map((n) => parseInt(n));
        console.log(h, m);
        if (!m || Number.isNaN(m)) {
          totalM += h;
        } else {
          totalH += h;
          totalM += Number.isNaN(m) ? 0 : m;
        }
      }
    });
    totalH += Math.floor(totalM / 60);
    return `${totalH}:${(totalM % 60).toString().padStart(2, "0")}`;
  };

  return (
    <>
      <h1 className="text-center my-5 text-[50px] uppercase tracking-wide">Time calculator</h1>
      <div className="max-w-[900px] mx-auto my-5 flex gap-3 justify-center">
        <div>
          {times.map((time, i) => (
            <div key={i}>
              <input className="border p-1" value={time} onChange={(e) => handleChange(e.target.value, i)} />
            </div>
          ))}
        </div>
        <div>
          <div className="text-[60px] sticky top-0">{timeSum()}</div>
        </div>
      </div>
    </>
  );
}

export default App;
