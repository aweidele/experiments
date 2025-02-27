import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { AudioButton } from "./AudioButton";
import tone_190 from "./assets/tone-190.mp4";
import tone_240 from "./assets/tone-240.mp4";
import tone_290 from "./assets/tone-290.mp4";
import tone_340 from "./assets/tone-340.mp4";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <AudioButton src={tone_190} />
        <AudioButton src={tone_240} />
        <AudioButton src={tone_290} />
        <AudioButton src={tone_340} />
      </div>
    </>
  );
}

export default App;
