import { useState } from "react";

import "./App.css";

function App() {
  const [stops, setStops] = useState([0, 250, 100, 150, 360, 300]);
  const [inputVal, setInputVal] = useState(stops);
  const k = Array.from(Array(51).keys());

  const pct = (val) => val / (k.length - 1);
  const stp = (val) => Math.floor(pct(val) * (stops.length - 1));
  const btw = (val) => (pct(val) - stp(val) / (stops.length - 1)) * (stops.length - 1);
  const btwVal = (val) => {
    const currentStop = stp(val);
    if (currentStop + 1 === stops.length) return stops[currentStop];

    return stops[currentStop] + Math.round((stops[currentStop + 1] - stops[currentStop]) * btw(val));
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setInputVal(e.target.value);
    setStops(
      e.target.value
        .split(",")
        .map((v) => parseInt(v))
        .filter((x) => x || x === 0)
    );
  };

  return (
    <>
      <div className="flex gap-10">
        <table className="text-sm">
          <tbody>
            {k.map((val) => (
              <tr>
                <td className="p-1">{val}</td>
                <td className="p-1">{Math.round(pct(val) * 100)}%</td>
                <td className="p-1">{Math.round(btw(val) * 100)}%</td>
                <td className="p-1" style={{ backgroundColor: `hsl(${btwVal(val)} 80% 50%)` }}>
                  {btwVal(val)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <textarea className="border h-50 p-2" value={inputVal} onChange={handleChange} />
        </div>
      </div>
    </>
  );
}

export default App;
