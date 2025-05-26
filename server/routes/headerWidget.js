import express from "express";
const router = express.Router();
import HeaderWidget from "../models/headerWidget.js";

// GET header widget settings
router.get("/", async (req, res) => {
    try {
        let widget = await HeaderWidget.findOne();
        if (!widget) {
            widget = new HeaderWidget();
            await widget.save();
        }
        res.json(widget);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// POST/PUT: Update header widget
router.put("/", async (req, res) => {
    try {
        const { logoUrl, spanText, buttons } = req.body;
        let widget = await HeaderWidget.findOne();

        if (!widget) {
            widget = new HeaderWidget({ logoUrl, spanText, buttons });
        } else {
            widget.logoUrl = logoUrl;
            widget.spanText = spanText;
            widget.buttons = buttons;
        }

        await widget.save();
        res.json(widget);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
