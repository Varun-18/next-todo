import connectDB from "@lib/mongoose";
import addTask from "@services/addTask";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  connectDB();
  const secret = process.env.SECRET;
  if (req.method === "POST") {
    const { email } = await getToken({ req, secret });
    const { task } = req.body;
    const data = await addTask(task, email);
    res.status(200).send(data);
  }
}
