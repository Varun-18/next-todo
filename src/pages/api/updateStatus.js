import connectDB from "@lib/mongoose";
import updateTask from "@services/updateTask";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  connectDB();
  const secret = process.env.SECRET;
  if (req.method === "POST") {
    const { email } = await getToken({ req, secret });
    const { id, value } = req.body;
    console.log(id, value);
    try {
      const data = await updateTask(email, id, value);
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  }
}
