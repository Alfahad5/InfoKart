import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
});

export default mongoose.model("Product", productSchema);
