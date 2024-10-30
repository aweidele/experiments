export default function Form({ formfields, onFormChange, onAdd }) {
  console.log("FORM", formfields);
  return (
    <>
      <div>
        {formfields.map((field, i) => {
          return (
            <div key={i}>
              <input type="number" onChange={onFormChange} value={field} />
              {i === formfields.length - 1 && <button onClick={onAdd}>+</button>}
            </div>
          );
        })}
      </div>
    </>
  );
}
