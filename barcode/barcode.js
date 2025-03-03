const container = document.getElementById("container");
const inner = document.createElement("p");
container.appendChild(inner);
if (!("BarcodeDetector" in globalThis)) {
  inner.innerHTML = `Barcode detector not supported`;
} else {
  inner.innerHTML = `Barcode detector supported!`;
}
