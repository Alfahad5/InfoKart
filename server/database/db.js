import mongoose from "mongoose";

export const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("Error While Connecting to DB:", error.message);
        process.exit(1);
    }
};


export default Connection;