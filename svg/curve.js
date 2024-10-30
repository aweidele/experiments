const wrapper = document.getElementById("wrapper");
const ptTable = document.getElementById("points");

const w = 1000;
const h = 600;
let p = 1;

const drawCurve = () => {
  const points = Array.from({ length: p + 1 }, (_, i) => `${(w / p) * i}, ${h / 2 + (i % 2 ? h / 4 : h / -4)}`);
  const svg = `
  <svg viewBox="0 0 ${w} ${h}">
    <path d="M${points.join(" ")}"
        fill="none" stroke="red" stroke-width="1"  />
  </svg>
  `;

  wrapper.innerHTML = svg;
  // ptTable.innerHTML = `<tbody>
  //   ${points
  //     .map(
  //       (pt) => `
  //     <tr>
  //     ${pt
  //       .map(
  //         (p) => `
  //       <td>${p}</td>
  //     `
  //       )
  //       .join("")}
  //     </tr>
  //     `
  //     )
  //     .join("")}
  // </tbody>`;
  console.log(p);
  console.log(points);
  p++;
};

setInterval(drawCurve, 250);
// drawCurve();
