import { useContext } from "react";
import { TestContext } from "./TestContext";

export function AThree() {
  console.log("AThree");
  const { val, setVal } = useContext(TestContext);
  return (
    <div>
      <h3>AThree</h3>
      <button onClick={() => setVal((prevVal) => prevVal - 1)}>{val} - 1</button>
    </div>
  );
}
