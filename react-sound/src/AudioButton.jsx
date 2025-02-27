import { useRef } from "react";

export function AudioButton({ src }) {
  const audioRef = useRef(null);
  const playAudio = () => {
    audioRef.current.play();
  };
  return (
    <div>
      <p>Tone</p>
      <button onClick={playAudio}>Play</button>
      <audio ref={audioRef} src={src} />
    </div>
  );
}
