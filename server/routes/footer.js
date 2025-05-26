import express from "express";
import FooterAbout from "../models/footerAbout.js";
import FooterHelpPolicy from "../models/footerHelpPolicy.js";
import FooterSocial from "../models/footerSocial.js";
import FooterMailUs from "../models/footerMailUs.js";

const router = express.Router();

// Generic function for CRUD operations
const createRoutes = (Model, endpoint) => {
    // Get all entries
    router.get(`/${endpoint}`, async (req, res) => {
        try {
            const data = await Model.find();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    });

    // Add new entry
    router.post(`/${endpoint}`, async (req, res) => {
        try {
            const newItem = new Model(req.body);
            await newItem.save();
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ message: "Error adding item", error });
        }
    });

    // Update an entry
    router.put(`/${endpoint}/:id`, async (req, res) => {
        try {
            const { id } = req.params;

            const updatedItem = await Model.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

            if (!updatedItem) {
                return res.status(404).json({ message: "Item not found" });
            }

            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: "Error updating item", error });
        }
    });

    // Delete an entry
    router.delete(`/${endpoint}/:id`, async (req, res) => {
        try {
            const { id } = req.params;
            await Model.findByIdAndDelete(id);
            res.status(200).json({ message: "Deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting item", error });
        }
    });
};

// Create routes for each section
createRoutes(FooterAbout, "footerAbout");
createRoutes(FooterHelpPolicy, "footerHelpPolicy");
createRoutes(FooterMailUs, "footerMailUs");

// Create routes specifically for FooterSocial with image, URL, and label
router.get("/footerSocial", async (req, res) => {
    try {
        const data = await FooterSocial.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.post("/footerSocial", async (req, res) => {
    try {
        const { image, url, label } = req.body;
        if (!image || !url || !label) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSocial = new FooterSocial({ image, url, label });
        await newSocial.save();
        res.status(201).json(newSocial);
    } catch (error) {
        res.status(500).json({ message: "Error adding social link", error });
    }
});

router.put("/footerSocial/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { image, url, label } = req.body;

        const updatedSocial = await FooterSocial.findByIdAndUpdate(
            id,
            { image, url, label },
            { new: true }
        );

        if (!updatedSocial) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedSocial);
    } catch (error) {
        res.status(500).json({ message: "Error updating social link", error });
    }
});

router.delete("/footerSocial/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await FooterSocial.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting social link", error });
    }
});


router.get("/widgetRoutes", async (req, res) => {
    try {
        // Assuming all widgets are stored in multiple models, fetch them all
        const aboutWidgets = await FooterAbout.find({}, "label route");
        const helpPolicyWidgets = await FooterHelpPolicy.find({}, "label route");
        const mailUsWidgets = await FooterMailUs.find({}, "label route");

        // Combine them into a single response
        const widgetRoutes = [...aboutWidgets, ...helpPolicyWidgets, ...mailUsWidgets];

        res.json(widgetRoutes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching widget routes", error });
    }
});


export default router;
