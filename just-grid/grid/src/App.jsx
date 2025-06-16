import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const photos = [
  { src: "https://picsum.photos/1200/800", width: 1200, height: 800 },
  { src: "https://picsum.photos/800/1200", width: 800, height: 1200 },
  { src: "https://picsum.photos/1024/768", width: 1024, height: 768 },
  { src: "https://picsum.photos/2024/768", width: 2024, height: 768 },
  { src: "https://picsum.photos/2024/768", width: 2024, height: 768 },
  { src: "https://picsum.photos/400/1768", width: 400, height: 1768 },
  { src: "https://picsum.photos/500/768", width: 500, height: 768 },
  { src: "https://picsum.photos/400/768", width: 400, height: 768 },
  { src: "https://picsum.photos/300/368", width: 300, height: 520 },
  // Add more...
];
import "./App.css";

function App() {
  return (
    <>
      <div>Hello.</div>
      <RowsPhotoAlbum spacing={5} photos={photos} targetRowHeight={520} />
    </>
  );
}

export default App;
