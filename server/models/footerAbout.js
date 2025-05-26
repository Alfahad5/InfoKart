import mongoose from "mongoose";

const footerAboutSchema = new mongoose.Schema({
    label: { type: String, required: true },
    route: { type: String, required: true },
});

const FooterAbout = mongoose.model("FooterAbout", footerAboutSchema);

export default FooterAbout;
