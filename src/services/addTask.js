import task from "models/task";
import getAllTask from "./getAllTask";

export default async function addTask(todo, email) {
  try {
    const existing = await task.find({ email });
    if (existing.length === 0) {
      const data = new task({
        email,
        taskList: [
          {
            task: todo,
          },
        ],
      });
      await data.save();
    } else {
      const data = await task.findOneAndUpdate(
        { email },
        {
          $push: {
            taskList: { task: todo },
          },
        }
      );
    }
    const data = await getAllTask(email);
    return data;
  } catch (error) {
    console.log(error);
  }
}
