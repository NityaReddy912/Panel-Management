const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("../Routes/routes");

const app = express();
app.use(cors());
const port = 9000;

// const url = "mongodb://localhost:27017/CandidateDB";
//const url = "mongodb+srv://panel:panel_pune@panelcluster.fvymwmx.mongodb.net/test"
// const url =
//   "mongodb+srv://darshan:darshan@cluster0.mjzagjx.mongodb.net/candidatedb?retryWrites=true&w=majority";
const url =
  "mongodb+srv://avinash:jVzfWkq29eTIaUvJ@panelcluster.fvymwmx.mongodb.net/Panel_Management";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

mongoose.set("strictQuery", true);

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("connected on port ", port);
});

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, OPTIONS",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type",
  );
  next();
});
