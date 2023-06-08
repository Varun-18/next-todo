import connectDB from "@lib/mongoose";
import user from "models/user";
import brcypt from "bcrypt";

export default async function handler(req, res) {
  connectDB();
  if (req.method === "POST") {
    const { username, password } = req.body;
    console.log(username, password, "**** backend ****")
    const data = await user.findOne({ username: username });
    console.log(data);

    if (!data) {
      res.status(404).json({ message: "Invalid Username" });
    }

    const matchPassword = await brcypt.compare(password, data.password);

    if (!matchPassword) {
      res.status(401).json({ message: "Invalid Password" });
    }

    res.status(200).send(data);
  }
}
