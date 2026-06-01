
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

        app.use("/api/auth", authRoutes);
        app.use("/api/products", productRoutes);
        app.use("/api/categories", categoryRoutes);
        app.use("/api/cart", cartRoutes);

app.use(
  "/api/wishlist",
  wishlistRoutes
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ElectroMart API Running",
  });
});

export default app;