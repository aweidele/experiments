const goalWins = 105;
const totalGames = 162;
const goalPct = goalWins / totalGames;
const projectedPct = 55 / totalGames;
const interveningWins = (projected, goal, tot = totalGames) => Math.ceil((goal - projected) / (1 - projected / tot));

const result = document.querySelector(".result tbody");
const gm = document.querySelector(".gm");

for (let i = 30; i < 62; i++) {
  const intervened = interveningWins(i, goalWins);
  const total = (projected, int) => Math.floor(int + (projected / totalGames) * (totalGames - int));

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${i}</td>
    <td>${intervened}</td>
    <td>${total(i, intervened)}</td>
  `;
  result.appendChild(tr);
}

for (let i = 1; i <= totalGames; i++) {
  const tr = document.createElement("tr");
  const g = Math.round(i * goalPct);
  const p = Math.round(i * projectedPct);
  tr.innerHTML = `
    <td>${i}</td>
    <td>${g}</td>
    <td>${p}</td>
    <td><strong>${interveningWins(p, g, i)}</strong></td>
  `;
  gm.appendChild(tr);
}
