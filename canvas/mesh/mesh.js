const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width, height;

const speedFactor = 10; // <== Adjust this to control animation speed

const staticPoints = [];
const movingPoints = [];
const cornerColors = ["oklch(0.942 0.1452 112.66)", "oklch(0.7942 0.1419 340.26)", "oklch(0.7197 0.1874 311.2)", "oklch(0.5635 0.2418 285.76)"];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  staticPoints.length = 0;
  staticPoints.push({ x: 0, y: 0, color: cornerColors[0] }); // top-left
  staticPoints.push({ x: width, y: 0, color: cornerColors[1] }); // top-right
  staticPoints.push({ x: width, y: height, color: cornerColors[2] }); // bottom-right
  staticPoints.push({ x: 0, y: height, color: cornerColors[3] }); // bottom-left
}
window.addEventListener("resize", resize);
resize();

const numMovingPoints = 8;
for (let i = 0; i < numMovingPoints; i++) {
  movingPoints.push({
    x: Math.random() * width,
    y: Math.random() * height,
    dx: (Math.random() - 0.5) * 0.4 * speedFactor,
    dy: (Math.random() - 0.5) * 0.4 * speedFactor,
    color: cornerColors[Math.floor(Math.random() * cornerColors.length)],
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  const allPoints = [...staticPoints, ...movingPoints];

  for (let p of allPoints) {
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(width, height) * 0.75);
    g.addColorStop(0, p.color);
    g.addColorStop(1, "transparent");

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
  }

  for (let p of movingPoints) {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
  }

  requestAnimationFrame(animate);
}

animate();
