import mongoose from "mongoose";

const headerWidgetSchema = new mongoose.Schema({
    logoUrl: { type: String, default: "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" },
    spanText: { type: String, default: "Explore Plus" },
    buttons: [{ label: String, route: String }], // Dynamic buttons array
});

const HeaderWidget = mongoose.model("HeaderWidget", headerWidgetSchema);

export default HeaderWidget;
