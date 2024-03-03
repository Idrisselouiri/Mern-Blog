import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// connect mongoDb
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

//listen server on port 3000
app.listen(3000, () => {
  console.log("Sever is running on port 3000");
});
