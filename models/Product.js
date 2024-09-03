import mongoose, { models } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    Name: { type: String },
    Description: { type: String },
    ImageURL: { type: String },
    Price: { type: Number },
    Qty: { type: Number },
    Category: { type: String },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", ProductSchema);

export default Product;
