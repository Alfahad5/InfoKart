import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
import Connection from './database/db.js';

import cartRoutes from "./routes/cart.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import footer from "./routes/footer.js";
import headerWidget from "./routes/headerWidget.js"
import Category from "./routes/category.js";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const PORT = 8000;
Connection();

app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/footer", footer);
app.use("/api/headerWidget", headerWidget);
app.use("/api/category", Category);
// app.use("/api/footerRoutes", footerRoutes);

app.listen(PORT, () => console.log("Server Running on : " + PORT));