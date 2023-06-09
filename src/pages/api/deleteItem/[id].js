import connectDB from "@lib/mongoose";
import deteleTask from "@services/deteleTask";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  connectDB();
  const secret = process.env.SECRET;
  if (req.method === "DELETE") {
    const { email } = await getToken({ req, secret });
    const { id } = req.query;
    console.log(id, "*** from delete ***");
    const data = await deteleTask(email, id);
    res.status(200).send(data);
  }
}
