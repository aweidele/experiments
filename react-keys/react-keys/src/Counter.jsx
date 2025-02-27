import { useState } from "react";

function CountItem({ v, highLighted }) {
  return (
    <li>
      <span className={highLighted ? `bg-slate-500` : ""}>{v}</span>
    </li>
  );
}

export default function Counter() {
  const [count, setCount] = useState([0]);
  const [highLighted, setHighlighted] = useState(false);

  const incrementCount = () => {
    setCount([count[0] + 1, ...count]);
  };

  const handleCountClick = (v) => {
    alert(v);
  };

  return (
    <div>
      <button className="p-5 border-fuchsia-800 border-4 uppercase" onClick={incrementCount}>
        Click Me
      </button>
      <ul>
        {count.map((v) => (
          <CountItem onClick={handleCountClick} key={v} v={v} />
        ))}
      </ul>
    </div>
  );
}
