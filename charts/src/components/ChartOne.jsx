export default function ChartOne({ percent, r, ir, s }) {
  function getCoordinatesForPercent(percent, inner = false) {
    const x = Math.cos(2 * Math.PI * percent) * (inner ? innerRad : radius);
    const y = Math.sin(2 * Math.PI * percent) * (inner ? innerRad : radius);
    return [x, y];
  }

  if (percent > 1) percent = 1;
  const radius = r ? r : 250;
  const innerRad = (ir ? ir : 0.65) * radius;
  const stroke = s ? s : 2;

  const color = `hsl(${360 * percent},70%,50%)`;
  const [X1, Y1] = getCoordinatesForPercent(0);
  const [X2, Y2] = getCoordinatesForPercent(percent);
  const [X3, Y3] = getCoordinatesForPercent(percent, true);
  const [X4, Y4] = getCoordinatesForPercent(0, true);
  const largeArcFlag = percent > 0.5 ? 1 : 0;

  const pathData = [`M ${X1} ${Y1}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${X2} ${Y2}`, `${percent === 1 ? "M" : "L"} ${X3} ${Y3}`, `A ${innerRad} ${innerRad} 0 ${largeArcFlag} 0 ${X4} ${Y4}`];
  if (percent < 1) pathData.push("Z");
  /* https://david-gilbertson.medium.com/a-simple-pie-chart-in-svg-dbdd653b6936 */

  return (
    <svg viewBox={`${radius * -1 - stroke} ${radius * -1 - stroke} ${radius * 2 + stroke * 2} ${radius * 2 + stroke * 2}`} style={{ transform: "rotate(-0.25turn)" }} className="chartSVG">
      <g>
        <path fill={color} strokeWidth={stroke} stroke="#000000" d={pathData.join(" ")}></path>
      </g>
    </svg>
  );
}
