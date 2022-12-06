const mongoose = require("mongoose");
const request = require("supertest");
import dotenv from "dotenv";
dotenv.config();
require("dotenv").config();

import app from "../server";

beforeEach(async () => {
  await require("../src/configs/db").connection();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET EMPLOYEES -----", () => {
  it("should return all employees", async () => {
    const res = await request(app).get("/api/user/employee");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET REVIEWS -----", () => {
  it("should return all reviews", async () => {
    const res = await request(app).get("/api/review");
    expect(res.statusCode).toBe(200);
  });
});
