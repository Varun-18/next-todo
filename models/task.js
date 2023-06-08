import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: String,
  status: { type: Boolean, default: false },
});

const taskListSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  taskList: { type: [taskSchema], default: [] },
});

export default mongoose.models.task || mongoose.model("task", taskListSchema);
