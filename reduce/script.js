const inputs = document.querySelectorAll("input");
const reduced_num = document.querySelector(".reduced_num");
const reduced_den = document.querySelector(".reduced_den");

const reduceFraction = (n, d) => {
  const findLCM = (l, h, i = 1) => {
    const m = h * i;
    console.log(`
      Iteration: ${i}
      Low: ${l}
      High: ${h}
      Multiple: ${m}
      m % l = ${m % l}
      `);

    if (m % l > 0) {
      return findLCM(l, h, i + 1);
    }

    return m;
  };
  const l = Math.min(n, d);
  const h = Math.max(n, d);
  // const m = findLCM(l, h);
  const GCD = (n * d) / findLCM(l, h);
  return [n / GCD, d / GCD];
};

const updateFracts = () => {
  const vals = Array.from(inputs).map((input) => {
    return parseInt(input.value);
  });
  const [n, d] = vals;
  const [rn, rd] = reduceFraction(n, d);
  reduced_num.innerHTML = rn;
  reduced_den.innerHTML = rd;
};

updateFracts();
inputs.forEach((input) => {
  input.addEventListener("change", updateFracts);
});
