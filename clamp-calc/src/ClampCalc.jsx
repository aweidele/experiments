import { useState } from "react";

export const ClampCalc = () => {
  const [minVP, setMinVP] = useState(375);
  const [maxVP, setMaxVP] = useState(840);
  const [minFS, setMinFS] = useState(10);
  const [maxFS, setMaxFS] = useState(24);

  function genCalc() {
    const v = ((maxFS - minFS) * 100) / (maxVP - minVP);
    const r = (minVP * maxFS - maxVP * minFS) / (minVP - maxVP) / 16;
    return `clamp(${minFS / 16}rem, ${v}vw + ${r}rem, ${maxFS / 16}rem)`;
  }

  return (
    <div>
      <div>
        <label>
          Min VP
          <br />
          <input type="number" value={minVP} onChange={(e) => setMinVP(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Max VP
          <br />
          <input type="number" value={maxVP} onChange={(e) => setMaxVP(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Min FS
          <br />
          <input type="number" value={minFS} onChange={(e) => setMinFS(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Max FS
          <br />
          <input type="number" value={maxFS} onChange={(e) => setMaxFS(e.target.value)} />
        </label>
      </div>
      <pre>{genCalc()}</pre>

      <div style={{ fontSize: genCalc() }}>
        <p>Pellentesque commodo eros a enim. Aliquam erat volutpat. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Vivamus elementum semper nisi.</p>
        <p>Sed cursus turpis vitae tortor. Aliquam lobortis. Nullam dictum felis eu pede mollis pretium. Cras id dui.</p>
      </div>
    </div>
  );
};
