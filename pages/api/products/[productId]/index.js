import Product from "@/models/Product";
import { dbConnect } from "@/db/connect";

export default async function handler(req, res) {
  const { method } = req;
  dbConnect();

  if (method === "GET") {
    const { productId } = req.query;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else if (method === "PUT") {
    try {
      const { productId } = req.query;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else if (method === "DELETE") {
    try {
      const { productId } = req.query;
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
