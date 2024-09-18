const wrapper = document.getElementById("wrapper");
const pos1 = "QWERYUOPGHJKZXVBN";
const pos2 = `QWRYOPGHJKZXVBN`;
import { words } from "./words.js";
console.log(words.sort());

[...pos1].forEach((l1) => {
  const headline = document.createElement("h2");
  headline.innerText = l1;
  wrapper.appendChild(headline);

  const list = document.createElement("ul");
  [...pos2].forEach((l2) => {
    const item = document.createElement("li");
    const word = `${l1}ERU${l2}`.toLowerCase();
    item.innerHTML = `${!words.includes(word) ? "<span>" : ""}${word}${!words.includes(word) ? "</span>" : ""}`;
    list.appendChild(item);
  });
  wrapper.appendChild(list);
});
