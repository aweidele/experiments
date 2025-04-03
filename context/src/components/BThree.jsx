import { useContext } from "react";
import { TestContext } from "./TestContext";
export function BThree() {
  console.log("BThree");
  console.log("--------");
  const { val, setVal } = useContext(TestContext);
  return (
    <div>
      <h3>BThree</h3>
      <button onClick={() => setVal((prevVal) => prevVal + 1)}>{val} + 1</button>
    </div>
  );
}
