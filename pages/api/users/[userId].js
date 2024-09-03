import Users from "../../../models/User";
import { dbConnect } from "@/db/connect";

export default async function handler(req, res) {
  const { method } = req;
  dbConnect();

  if (method === "GET") {
    const { userId } = req.query;
    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else if (method === "PUT") {
    try {
      const { userId } = req.query;
      const updatedUser = await Users.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else if (method === "DELETE") {
    try {
      const { userId } = req.query;
      const deletedUser = await Users.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
