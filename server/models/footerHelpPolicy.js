import mongoose from "mongoose";

const footerHelpPolicySchema = new mongoose.Schema({
    label: { type: String, required: true },
    route: { type: String, required: true },
});

const FooterHelpPolicy = mongoose.model("FooterHelpPolicy", footerHelpPolicySchema);

export default FooterHelpPolicy;
