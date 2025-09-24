import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ClampCalc } from "./ClampCalc";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ClampCalc />
    </>
  );
}

export default App;
