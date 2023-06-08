import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.connect(process.env.MONGOOSE_URI);
};

export default connectDB;
