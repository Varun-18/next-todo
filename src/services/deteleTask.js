import task from "models/task";
import getAllTask from "./getAllTask";

export default async function deteleTask(email, id) {
  try {
    await task.findOneAndUpdate(
      { email },
      {
        $pull: {
          taskList: { _id: id },
        },
      }
    );
    const data = await getAllTask(email);
    return data;
  } catch (error) {
    console.log(error);
  }
}
