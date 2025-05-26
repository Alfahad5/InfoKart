import mongoose from "mongoose";

const footerMailUsSchema = new mongoose.Schema({
    label: { type: String },
    email: { type: String, required: true }
});

const FooterMailUs = mongoose.model("FooterMailUs", footerMailUsSchema);

export default FooterMailUs;
