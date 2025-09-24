import { draggable } from "@atlaskit/pragmatic-drag-and-drop";

const chessboardStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gridTemplateRows: "repeat(8, 1fr)",
  width: "500px",
  height: "500px",
  border: "3px solid lightgrey",
};

const squareStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyles = {
  width: 45,
  height: 45,
  padding: 4,
  borderRadius: 6,
  boxShadow: "1px 3px 3px rgba(9, 30, 66, 0.25),0px 0px 1px rgba(9, 30, 66, 0.31)",
  "&:hover": {
    backgroundColor: "rgba(168, 168, 168, 0.25)",
  },
};

function Chessboard() {
  return <div style={chessboardStyles}>Chessboard?</div>;
}

function App() {
  return (
    <>
      <Chessboard />
    </>
  );
}

export default App;
