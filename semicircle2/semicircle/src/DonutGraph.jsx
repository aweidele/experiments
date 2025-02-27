const hslLow = [214, 31, 26];
const hslHigh = [345, 67, 55];
const m = 0.5;

function calcHSL(percent) {
  const r = percent < m ? 0 : percent - m;
  const pct = (r / (1 - m)) * percent;

  return hslLow.map((v, i) => {
    const l = Math.min(v, hslHigh[i]);
    const h = Math.max(v, hslHigh[i]);

    return (h - l) * pct + l;
  });
}

export default function DonutGraph({ percent, className, r, ir, s }) {
  function getCoordinatesForPercent(percent, inner = false) {
    const x = Math.cos(2 * Math.PI * percent) * (inner ? innerRad : radius);
    const y = Math.sin(2 * Math.PI * percent) * (inner ? innerRad : radius);
    return [x, y];
  }

  if (percent > 1) percent = 1;
  const radius = r ? r : 20;
  const innerRad = (ir || ir === 0 ? ir : 0.85) * radius;
  const stroke = s ? s : 1;

  const [hue, sat, lit] = calcHSL(percent);
  const color = `hsl(${hue},${sat}%,${lit}%)`;

  const [X1, Y1] = getCoordinatesForPercent(0);
  const [X2, Y2] = getCoordinatesForPercent(percent);
  const [X3, Y3] = getCoordinatesForPercent(percent, true);
  const [X4, Y4] = getCoordinatesForPercent(0, true);
  const largeArcFlag = percent > 0.5 ? 1 : 0;

  const pathData = [`M ${X1} ${Y1}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${X2} ${Y2}`, `${percent === 1 ? "M" : "L"} ${X3} ${Y3}`, `A ${innerRad} ${innerRad} 0 ${largeArcFlag} 0 ${X4} ${Y4}`];
  if (percent < 1) pathData.push("Z");
  /* https://david-gilbertson.medium.com/a-simple-pie-chart-in-svg-dbdd653b6936 */

  return (
    <svg className={`${className}  block`} viewBox={`${radius * -1 - stroke} ${radius * -1 - stroke} ${radius * 2 + stroke * 2} ${radius * 2 + stroke * 2}`}>
      <g>
        <path fill={color} strokeWidth={s} stroke="#FFFFFF" d={pathData.join(" ")}></path>
      </g>
    </svg>
  );
}
