import mongoose from "mongoose";
export const connectDB = async() => {
  mongoose
    .connect(`${process.env.MONGO_URI}`, )
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};
