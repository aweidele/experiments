export default function Chart() {
  const pct = 0.85;

  const rad = 100;
  const stroke = 200;

  const dash = rad * Math.PI * 2;
  const viewbox = rad * 2 + stroke;
  const dasharray = `${dash * pct} ${dash * (1 - pct)}`;
  const pos = viewbox / 2;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${viewbox} ${viewbox}`}>
      <circle className="ring" cx={pos} cy={pos} r={rad} stroke-width={stroke} stroke-dasharray={dasharray} stroke-dashoffset="0" />
    </svg>
  );
}
