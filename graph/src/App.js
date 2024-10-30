import { useState } from "react";
import "./App.css";

function App() {
  const [points, setPoints] = useState([16, 13, 15, 12, 17]);
  const [inputVal, setInputVal] = useState();

  const handleChange = (e) => {
    setInputVal((oldVal) => e.target.value);
  };

  const handleSubmit = () => {
    setPoints((oldPoints) => [...points, inputVal]);
    setInputVal((oldVal) => "");
  };

  const mapPoints = () => {
    const sorted = [...points].sort((a, b) => a - b);
    const lowest = sorted[0];
    const highest = sorted[sorted.length - 1];
    const range = highest - lowest;
    // console.log(sorted, range);

    points.forEach((point) => {
      console.log(((point - lowest) / range) * 600, range);
    });

    return points.map((point, index) => `${(1000 / (points.length - 1)) * index} ${600 - ((point - lowest) / range) * 600}`).join(" ");
  };
  const graphPoints = mapPoints();

  return (
    <div className="flex p-5">
      <div className="w-1/4 pr-5">
        <div className="flex">
          <input onChange={handleChange} value={inputVal} type="number" className="border border-slate-600 grow" />
          <button className="p-2 bg-lime-700 uppercase text-white font-bold tracking-wide" onClick={handleSubmit}>
            Sumbit
          </button>
        </div>
        <ul className="my-5">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="shrink-0 w-3/4 border border-slate-800">
        <div className="aspect-[10/6]">
          {points.length > 1 && (
            <svg id="uuid-00adf8eb-3941-42cc-a5a3-ca459bcecf1d" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" className="w-full">
              <polyline className="fill-amber-500" points={`${graphPoints} 1000 600 0 600`} />
              <polyline className="fill-transparent stroke-amber-600 stroke-2" points={graphPoints} />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
