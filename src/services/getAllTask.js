import task from "models/task";

export default async function getAllTask(email) {
  try {
    const data = await task.find({ email });
    return data;
  } catch (error) {
    console.log(error);
  }
}
