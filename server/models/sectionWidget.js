const mongoose = require("mongoose");

const SectionWidgetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true } // Store image filename
});

module.exports = mongoose.model("SectionWidget", SectionWidgetSchema);
