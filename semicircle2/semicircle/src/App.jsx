import { useState } from "react";
import DonutGraph from "./DonutGraph";
import "./App.css";

const r = 1000;
const ir = 400;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-[800px] h-[800px] border relative">
        <DonutGraph className="absolute top-0 left-0" percent={0.25} r={r} ir={ir / r} s={50} />
        <DonutGraph className="absolute top-0 left-0 rotate-90" percent={0.25} r={r} ir={ir / r} s={50} />
        <DonutGraph className="absolute top-0 left-0 rotate-180" percent={0.25} r={r} ir={ir / r} s={50} />
        <DonutGraph className="absolute top-0 left-0 -rotate-90" percent={0.25} r={r} ir={ir / r} s={50} />
      </div>
    </>
  );
}

export default App;
