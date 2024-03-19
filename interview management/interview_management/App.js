const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const panelRouter = require("./routes/panelRouter");
const feedbackRouter = require("./routes/feedbackRouter");
const listInterviewRouter = require("./routes/listInterviewRouter");
const interTypeRouter = require("./routes/interviewType");
const ScheduleInterveiwRouter = require("./routes/scheduleInterveiw_router");

const app = express();
const port = process.env.PORT || 9000;
const url =
  "mongodb+srv://avinash:jVzfWkq29eTIaUvJ@panelcluster.fvymwmx.mongodb.net/Panel_Management";

app.use(express.json());
app.use(cors());

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log(err));

app.use("/panelRouter", panelRouter);
app.use("/feedbackRouter", feedbackRouter);
app.use("/listInterviews", listInterviewRouter);
app.use("/interview-type", interTypeRouter);
app.use("/scheduleinterview", ScheduleInterveiwRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});
