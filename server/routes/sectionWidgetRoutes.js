import express from "express";
import multer from "multer";
import SectionWidget from "../models/sectionWidget";
import path from "path";

const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Create or Update Section Widget
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, content } = req.body;
        const imagePath = req.file ? req.file.filename : null;

        const widget = await SectionWidget.findOne();
        if (widget) {
            widget.title = title;
            widget.content = content;
            if (imagePath) widget.image = imagePath;
            await widget.save();
            return res.json({ message: "Updated successfully", widget });
        } else {
            const newWidget = new SectionWidget({ title, content, image: imagePath });
            await newWidget.save();
            return res.json({ message: "Created successfully", widget: newWidget });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch widget data
router.get("/", async (req, res) => {
    try {
        const widget = await SectionWidget.findOne();
        res.json(widget);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete widget
router.delete("/", async (req, res) => {
    try {
        await SectionWidget.deleteMany({});
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
