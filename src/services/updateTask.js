import task from "models/task";
import getAllTask from "./getAllTask";

export default async function updateTask(email, id, value) {
  console.log(email, id, value, "update task ");
  try {
    await task.updateOne(
      {
        email,
        "taskList._id": id,
      },
      {
        $set: { "taskList.$.status": value },
      }
    );
    const data = await getAllTask(email);
    return data;
  } catch (error) {
    console.log(error);
  }
}
