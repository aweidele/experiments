const progressWrapper = document.querySelector(".progress-wrapper");
const { max, current } = progressWrapper.dataset;

const pct = current / max;
const duration = 4000 * pct;

const progressBar = document.querySelector(".progress-wrapper progress");
const progressPercent = document.querySelector(".progress-percent");

progressBar.setAttribute("max", max);

const element = document.querySelector(".animtest");
let start, previousTimeStamp;
let done = false;

let startVal = 0;

function step(timeStamp) {
  if (!done) {
    if (start === undefined) {
      start = timeStamp;
    }

    const elapsed = Math.min(timeStamp - start, duration);
    const progress = (elapsed / duration) * current;
    const percentage = (progress / max) * 100;

    progressBar.setAttribute("value", progress);
    progressPercent.style.left = `${percentage}%`;
    progressPercent.innerText = `${Math.round(percentage)}%`;

    if (elapsed >= duration) done = true;
    // element.innerHTML = `<p>${elapsed}</p><p>${progress}</p><p>${percentage}</p>${done && "<p>Done</p>"}`;

    previousTimeStamp = timeStamp;
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
