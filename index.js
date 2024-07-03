import dotenv from "dotenv";
import express from "express";
import connectDB from "./DB/connection.js";
import { cronJob } from "./src/utils/cron.job.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use("/", (req, res) => {
  res.json({ message: "Cron Jobs Working" });
});
app.use("*", (req, res) => {
  res.json({ message: "Invaild Path" });
});

connectDB();

cronJob();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
