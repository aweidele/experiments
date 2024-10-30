export function findTextNodes(node) {}

export function wrapTextInSpans(element) {
  const nodes = Array.from(element.childNodes);
  nodes.forEach((node) => {
    console.log(node.nodeType, Node.TEXT_NODE);
    if (node.nodeType === Node.TEXT_NODE) {
    } else if (node.nodeType === Node.ELEMENT_NODE) {
    }
  });
  console.log(nodes);
}
