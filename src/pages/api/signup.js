import connectDB from "@lib/mongoose";
import user from "models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  connectDB();
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);
    const existing = await user.findOne({ email });
    if (!existing) {
      const existing = await user.findOne({ username });
      if (!existing) {
        const data = new user({ username, email, password: hashPassword });
        await data.save();
        res.status(200).json(data);
      } else {
        res.send("username already exist");
      }
    } else {
      res.send("email already exist");
    }
  }
}
