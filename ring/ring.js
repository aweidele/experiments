function positionSegments(numSegments, parentSize, ringThickness) {
  const parent = document.getElementById("ringContainer");
  parent.innerHTML = ""; // Clear previous elements

  const outerRadius = parentSize / 2;
  const innerRadius = outerRadius * (1 - ringThickness); // Adjust thickness dynamically
  const segmentWidth = (outerRadius - innerRadius) * 2; // Button width = ring thickness

  for (let i = 0; i < numSegments; i++) {
    const angle = (360 / numSegments) * i;
    const radians = angle * (Math.PI / 180);

    // Calculate position in the ring
    const x = outerRadius + (innerRadius + segmentWidth / 2) * Math.cos(radians);
    const y = outerRadius + (innerRadius + segmentWidth / 2) * Math.sin(radians);

    // Create button
    const btn = document.createElement("button");
    btn.classList.add("segment");
    btn.style.position = "absolute";
    btn.style.left = `${x - segmentWidth / 2}px`;
    btn.style.top = `${y - segmentWidth / 2}px`;
    btn.style.width = `${segmentWidth}px`;
    btn.style.height = `${segmentWidth}px`;

    // Create and insert SVG segment
    btn.innerHTML = createSegmentSVG(numSegments, outerRadius, innerRadius);

    parent.appendChild(btn);
  }
}

// Function to generate a donut segment as an SVG
function createSegmentSVG(numSegments, outerRadius, innerRadius) {
  const angle = 360 / numSegments;
  const startAngle = -angle / 2; // Center each segment
  const endAngle = angle / 2;

  // Convert polar to cartesian
  function polarToCartesian(radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
    return {
      x: radius + radius * Math.cos(angleInRadians),
      y: radius + radius * Math.sin(angleInRadians),
    };
  }

  const outerStart = polarToCartesian(outerRadius, startAngle);
  const outerEnd = polarToCartesian(outerRadius, endAngle);
  const innerStart = polarToCartesian(innerRadius, endAngle);
  const innerEnd = polarToCartesian(innerRadius, startAngle);

  // Large arc flag (0 or 1)
  const largeArcFlag = angle > 180 ? 1 : 0;

  // SVG path data
  const pathData = `
      M ${outerStart.x},${outerStart.y}
      A ${outerRadius},${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x},${outerEnd.y}
      L ${innerStart.x},${innerStart.y}
      A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 0 ${innerEnd.x},${innerEnd.y}
      Z
  `;

  return `<svg viewBox="0 0 ${outerRadius * 2} ${outerRadius * 2}" width="100%" height="100%">
      <path d="${pathData}" fill="red" stroke="black" stroke-width="2"/>
  </svg>`;
}

// Example usage: 5 segments in a 300px container with a 30% thickness
positionSegments(5, 300, 0.3);
