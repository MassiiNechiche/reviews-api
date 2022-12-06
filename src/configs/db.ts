import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MongoUrl = process.env.MONGO_URI;

async function connection() {
  await mongoose
    .connect(MongoUrl.toString())
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("Database connection error : ", error);
    });
}

function createSchema(schema: any) {
  return new mongoose.Schema(schema, {
    timestamps: true,
  });
}

function createModel(name: string, schemaStructor: any) {
  let schema = createSchema(schemaStructor);
  schema.plugin(require("mongoose-autopopulate"));

  return mongoose.model(name, schema);
}

export { connection, createModel };
