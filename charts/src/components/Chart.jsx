function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
}

export default function Chart() {
  const values = [40, 32, 25, 50, 25];
  const sum = values.reduce((acc, current) => acc + current, 0);
  let cumulativePercent = 0;

  const slices = values.map((slice) => {
    const percent = slice / sum;
    const colorStart = cumulativePercent * 360;
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

    cumulativePercent += percent;
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    console.log(cumulativePercent);

    return {
      color: `hsla(${colorStart},74%,55%,1)`,
      pathData: [`M ${startX} ${startY}`, `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, `L 0 0`].join(" "),
    };
  });
  console.log(slices);
  /* https://david-gilbertson.medium.com/a-simple-pie-chart-in-svg-dbdd653b6936 */

  return (
    <svg viewBox="-1 -1 2 2" style={{ transform: "rotate(-0.25turn)" }} className="chartSVG">
      <g>
        {slices.map((slice, i) => {
          return <path key={`slice${i}`} fill={slice.color} d={slice.pathData}></path>;
        })}
      </g>
    </svg>
  );
}
