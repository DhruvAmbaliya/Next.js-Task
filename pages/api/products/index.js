import Product from "../../../models/Product";
import { dbConnect } from "../../../db/connect";

export default async function handler(req, res) {
  const { method } = req;
  dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  if (method === "POST") {
    try {
      await Product.create(req.body);
      res.status(201).json({ message: "Success To Add a new Product" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
