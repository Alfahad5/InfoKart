import mongoose from "mongoose";

const footerSocialSchema = new mongoose.Schema({
    image: { type: String, required: true },  // URL or path to the image
    url: { type: String, required: true },    // Redirect URL
    label: { type: String, required: true }   // Label for the social media link
});

const FooterSocial = mongoose.model("FooterSocial", footerSocialSchema);

export default FooterSocial;
