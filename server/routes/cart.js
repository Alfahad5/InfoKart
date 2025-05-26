import express from "express";
import jwt from "jsonwebtoken";
import Cart from "../models/cart.js";

const router = express.Router();

// 🔹 Middleware to verify JWT token
const authenticateUser = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]; // ✅ Get token from header's Authorization section.

    //console.log("Extracted Token in middleware:", token);//working correctly now.

    if (!token) return res.status(401).json({ error: "Unauthorized: Token missing" });

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            req.userId = decoded.userId;
            req.role = decoded.role;
            next();
        });
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
};



// 🔹 Fetch user's cart
router.get("/:userId", authenticateUser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.itemId");
        res.json(cart || { items: [] });  // ✅ Return empty cart if null
    } catch (error) {
        res.status(500).json({ error: "Error fetching cart" });
    }
});

// 🔹 Add item to cart
router.post("/add/:id", authenticateUser, async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ itemId, quantity: 1 }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ itemId, quantity: 1 });
            }
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error adding to cart" });
    }
});

// 🔹 Remove item from cart
router.post("/remove", authenticateUser, async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.items = cart.items.filter(item => item.itemId.toString() !== itemId);
            await cart.save();
        }

        res.json(cart || { items: [] });  // ✅ Return empty cart if null
    } catch (error) {
        res.status(500).json({ error: "Error removing from cart" });
    }
});

export default router;

// 🔹 Clear user's cart after purchase
router.post("/clear/:userId", authenticateUser, async (req, res) => {
    try {
        const { userId } = req.params;
        await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });
        res.json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error clearing cart" });
    }
});

// 🔹 Update item quantity in cart
router.post("/update-quantity", authenticateUser, async (req, res) => {
    const { userId, itemId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ error: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);

        if (itemIndex === -1) return res.status(404).json({ error: "Item not found in cart" });

        if (quantity < 1) {
            cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error updating quantity" });
    }
});
