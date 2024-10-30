export function testOne(sample) {
  const textNode = sample.firstChild;
  console.log(textNode, textNode.nodeType);
  // text.forEach((t) => {
  //   const textNode = t.firstChild;
  if (textNode.nodeType !== 3) {
    throw new Error("Lines can only be extracted from text nodes.");
  }
  const textContent = textNode.textContent;
  const range = document.createRange();
  const lines = [];
  let lineCharacters = [];

  for (var i = 0; i < textContent.length; i++) {
    range.setStart(textNode, 0);
    range.setEnd(textNode, i + 1);

    const lineIndex = range.getClientRects().length - 1;
    if (!lines[lineIndex]) {
      lines.push((lineCharacters = []));
    }

    lineCharacters.push(textContent.charAt(i));
  }
  console.log(lines);

  const newContent = `
  ${lines.map((line) => `<span>${line.join("")}</span>`).join("")}
`;

  sample.innerHTML = newContent;
}
