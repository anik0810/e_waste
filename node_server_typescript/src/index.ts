import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { json } from "body-parser";
import { DeviceRouter } from "./routes/device.routes";
import { CONFIG } from "./config/config";

dotenv.config();

const app: Express = express();

const port = CONFIG.port;

const options: cors.CorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
};

app.use(cors(options));
app.use(json());
app.use([DeviceRouter]);

mongoose
  .connect(CONFIG.mongo_uri)
  .then(() => console.log("  Database connected 📟 "))
  .catch((err) => console.log(err))


app.listen(port, () => {
  console.log(`App is running at https://localhost:${port}`);
});