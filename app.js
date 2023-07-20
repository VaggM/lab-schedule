// node.js modules
const express = require("express");
const app = express();

// api handlers
const schedule = require("./routes/schedule");

// main website page folder

app.use("/", express.static("./front-end/build"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/v1/schedule", schedule);

app.listen(8000, () => {
  console.log("8000 is up");
});
