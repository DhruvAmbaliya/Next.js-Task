import User from "../../../models/User";
import { dbConnect } from "../../../db/connect";

export default async function handler(req, res) {
  const { method } = req;
  dbConnect();

  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  if (method === "POST") {
    try {
      await User.create(req.body);
      res.status(201).json({ message: "Success To Add a new User" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
