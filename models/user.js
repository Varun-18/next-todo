import mongoose, { Schema, model } from "mongoose";

const userSchema = Schema({
  username: String,
  email: String,
  password: String,
});

export default mongoose.models.localUser || model("localUser", userSchema);
