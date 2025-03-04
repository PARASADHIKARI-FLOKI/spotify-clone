import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/spofity");
  console.log("database is connected");
};



export default connectDB;