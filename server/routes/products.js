import express from 'express';
import Product from "../models/product.js";  // ✅ Ensure this path is correct

const router = express.Router();

// Create Product
router.post("/add", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
});

// 🔍 Search Products by Name (Like in SQL)
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query; // Get search query from request params
        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        // Case-insensitive search using regex (LIKE in MySQL)
        const products = await Product.find({ name: { $regex: query, $options: "i" } });

        res.json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ error: "Server error while searching products" });
    }
});

// Read all products (Fetch products)
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().populate("category"); // Populate category data
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error); // Log error to console
        res.status(500).json({ message: "Error getting product", error: error.message });
    }
});

// Get a single product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category"); // Populate category data
        res.json(product);
    } catch (error) {
        console.error("Error fetching single product:", error); // Log error to console
        res.status(500).json({ message: "Error getting product", error: error.message });
    }
});


//Delete Product
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});

// Update Product
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
});


export default router;