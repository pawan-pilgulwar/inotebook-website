const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo(); // connecting to mongo
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // to read JSON file

// Available routes
app.use("/api/auth", require("./routes/auth")); // creating endpoints for authitencation
app.use("/api/notes", require("./routes/notes")); // creating endpoints for editng Notes

// listening ports
app.listen(port, (req, res) => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`);
});
