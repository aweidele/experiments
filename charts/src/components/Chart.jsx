const radius = 250;
const stroke = 2;

function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent) * radius;
  const y = Math.sin(2 * Math.PI * percent) * radius;
  return [x, y];
}

export default function Chart() {
  const values = [10, 20, 30, 20, 10, 20, 20, 10, 20, 10, 30, 15, 10];
  const sum = values.reduce((acc, current) => acc + current, 0);
  let cumulativePercent = 0;

  const slices = values.map((slice) => {
    const percent = slice / sum;
    const colorStart = cumulativePercent * 360;
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

    cumulativePercent += percent;
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    return {
      // color: `hsla(${colorStart},74%,55%,1)`,
      color: "transparent",
      pathData: [`M ${startX} ${startY}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`, `L 0 0`, `L ${startX} ${startY}`].join(" "),
    };
  });
  /* https://david-gilbertson.medium.com/a-simple-pie-chart-in-svg-dbdd653b6936 */

  return (
    <svg viewBox={`${radius * -1 - stroke} ${radius * -1 - stroke} ${radius * 2 + stroke * 2} ${radius * 2 + stroke * 2}`} style={{ transform: "rotate(-0.25turn)" }} className="chartSVG">
      <g>
        {slices.map((slice, i) => {
          return <path key={`slice${i}`} fill={slice.color} stroke-width={stroke} stroke="#000000" d={slice.pathData}></path>;
          // return <path key={`slice${i}`} fill="transparent" d={slice.pathData}></path>;
        })}
      </g>
    </svg>
  );
}
