import HexMosaic from "./components/HexMosaic";
import flower from "./assets/flower.jpeg";
import { useState } from "react";

function App() {
  const [hexSize, setHexSize] = useState(50);
  const [gap, setGap] = useState(2);

  const gapSize = (hs) => (hs * 8) / 100;
  return (
    <>
      <div className="flex max-w-4xl border m-auto gap-4 p-4">
        <div>
          <label className="my-4 block">
            <strong className="block">
              Hex Size - {hexSize} / {Math.round(hexSize * 8) / 100}
            </strong>
            <input type="range" value={hexSize} step={2} min={0} max={100} onChange={(e) => setHexSize(e.target.value)} />
          </label>
          {/* <label className="my-4 block">
            <strong className="block">Gap Size - {gap}</strong>
            <input type="range" value={gap} step={1} min={0} max={8} onChange={(e) => setGap(e.target.value)} />
          </label> */}
        </div>
        <div className="border grow">
          <div className="w-full aspect-3/4">
            <HexMosaic image={flower} hexSize={hexSize} gap={gapSize(hexSize)} className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
