import connectDB from "@lib/mongoose";
import getAllTask from "@services/getAllTask";
import task from "models/task";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  connectDB();
  const secret = process.env.SECRET;
  if (req.method === "GET") {
    const { email } = await getToken({ req, secret });
    const data = await getAllTask(email);
    console.log(data, "****** getAllTask for new google user ******");
    const length = data.length;
    if (length === 0) {
      res.status(200).json({ message: "no task found" });
    } else {
      res.status(200).send(data);
    }
  }
}
