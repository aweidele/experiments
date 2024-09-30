const randomNum = (low, high) => {
  return Math.floor(Math.random() * (high - low + 1) + low);
};

const bedType = [
  { name: "King", sleeps: 2 },
  { name: "Queen", sleeps: 2 },
  { name: "Sofabed", sleeps: 2 },
  { name: "Twin", sleeps: 1 },
];

const genTable = document.getElementById("gen");
const guests = [8, 3, 4, 5, 8, 9, 7, 7, 4, 10, 5, 4, 4, 9, 8, 7, 10, 10, 10, 7, 6, 6, 10, 10, 5, 4, 3, 8, 2, 7, 8, 6, 7, 6, 7, 10, 10, 5, 7, 7, 3, 7, 5, 6, 6, 2, 9, 5, 9, 3];

const genBeds = (bedList, guestsLeft) => {
  if (guestsLeft > 2) {
    const bedId = randomNum(0, 2);
    bedList.push({ bedId: bedId, ...bedType[bedId] });
    guestsLeft -= bedType[bedId].sleeps;
    genBeds(bedList, guestsLeft);
  }
  if (guestsLeft <= 0) return bedList;
};

const beds = guests.map((num) => {
  const bedId = randomNum(0, 1);
  let guestsLeft = num - 2;
  const bedList = [{ bedId: bedId, ...bedType[bedId] }];

  while (guestsLeft > 2) {
    const bedId = randomNum(0, 2);
    guestsLeft -= bedType[bedId].sleeps;
    bedList.push({ bedId: bedId, ...bedType[bedId] });
    // guestsLeft--;
  }

  while (guestsLeft >= 0) {
    const bedId = randomNum(0, 2);
    guestsLeft--;
  }

  return {
    guests: num,
    beds: bedList,
  };
});

console.log(beds);

const thead = document.createElement("thead");
thead.innerHTML = `
  <tr><th>Guests</th></tr>
`;
genTable.appendChild(thead);

const tbody = document.createElement("tbody");
genTable.appendChild(tbody);

guests.forEach((guest) => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${guest}</td>`;
  tbody.appendChild(row);
});
