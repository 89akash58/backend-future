const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
app.use(cors());
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use("/", require("./routes/cards"));

app.get("/ping", (req, res) => {
  res.json({ message: "server is running" });
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
