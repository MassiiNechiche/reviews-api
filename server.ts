import express, { Express, Request, Response } from "express";
const cors = require("cors");
import dotenv from "dotenv";
dotenv.config();

const app: Express = express().use("*", cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Database
require("./src/configs/db").connection();

// Routes
import routes from "./src/routes/index";
app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Server Up on Port : ", PORT);
});

export = app;
