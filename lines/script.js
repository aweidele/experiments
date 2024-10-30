const spanList = [];
const collapseWhiteSpace = (value) => value.trim().replace(/\s+/g, " ");
// const collapseWhiteSpace = (value) => value;

const wrapLinesInSpans = (node) => {
  const textContent = node.textContent;
  const range = document.createRange();
  const lines = [];
  let lineCharacters = [];

  for (var i = 0; i < textContent.length; i++) {
    range.setStart(node, 0);
    range.setEnd(node, i + 1);

    const lineIndex = range.getClientRects().length - 1;
    if (!lines[lineIndex]) {
      lines.push((lineCharacters = []));
    }

    lineCharacters.push(textContent.charAt(i));
  }

  const spans = lines.map((line) => {
    const span = document.createElement("span");
    span.innerText = line.join("");
    return span;
  });

  return spans;
};

const getLines = (element) => {
  const nodes = element.childNodes;
  const lineNodes = [];

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const spans = wrapLinesInSpans(node);
      lineNodes.push({ type: "text", node: node, content: spans });
      spanList.push(...spans);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      lineNodes.push({ type: "element", node: node, content: getLines(node) });
    }
  });

  return lineNodes;
};

const outputLineSpans = (lineNodes, element) => {
  lineNodes.forEach((line) => {
    const { type, content, node } = line;
    if (type === "text") {
      content.forEach((el) => {
        element.insertBefore(el, node);
      });
      node.remove();
    } else if (type === "element") {
      outputLineSpans(line.content, node);
    }
  });
};

const lineOffsets = () => {
  let line = 0;
  let currentOffset = 0;
  spanList.forEach((span) => {
    const y = span.offsetTop;
    if (y > currentOffset) {
      line++;
      currentOffset = y;
    }
    span.dataset.lineNum = line;
  });
};

const sample = document.querySelector(".sample");
const output = document.querySelector(".out");

const lineNodes = getLines(sample);
outputLineSpans(lineNodes, sample);
lineOffsets();
console.log(spanList);
// output.innerHTML = lineNodes
