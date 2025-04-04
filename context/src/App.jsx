import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AOne } from "./components/AOne";
import { BOne } from "./components/BOne";
import { TestContextProvider } from "./components/TestContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ display: "flex" }}>
        <TestContextProvider>
          <AOne />
          <BOne />
        </TestContextProvider>
      </div>
    </>
  );
}

export default App;
