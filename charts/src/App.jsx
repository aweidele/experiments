import { useState } from "react";
// import Chart from "./components/Chart";
import ChartOne from "./components/ChartOne";
import Form from "./components/Form";

function App() {
  const [percent, setPercent] = useState(25);

  function handlePercentChange(e) {
    const newPct = e.target.value;
    console.log(!!newPct);
    setPercent(newPct);
  }
  // const [fields, changeFields] = useState([0]);
  // console.log(fields);
  // function handleFormChange() {}

  // function handleAdd() {
  //   const newFields = [...fields];
  //   newFields.push(0);
  //   changeFields(newFields);
  // }

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="chart">
            <ChartOne percent={percent ? percent / 100 : 0} />
          </div>
          <div className="form">
            <input type="number" value={percent} onChange={handlePercentChange} min="0" max="100" />
            {/* <Form formfields={fields} onFormChange={handleFormChange} onAdd={handleAdd} /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
