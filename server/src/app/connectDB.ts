import mongoose from "mongoose";
export const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/streaming")
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};
