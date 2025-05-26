import express from "express";
import Category from "../models/category.js";
import Product from "../models/product.js"; // Import the Product model

const router = express.Router();

// Fetch all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch products by category ID
router.get("/:id/products", async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id }).populate("category"); // Fetch products belonging to the category
        res.json(products);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ message: "Error fetching products for this category", error: error.message });
    }
});

// Create a new category
router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a category
router.delete("/:id", async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
