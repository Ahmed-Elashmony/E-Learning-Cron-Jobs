import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connection.js";
import { cronJob } from "./src/utils/cron.job.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

connectDB();
cronJob();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
