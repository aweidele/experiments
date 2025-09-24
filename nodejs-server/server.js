const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello from the API!" });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
