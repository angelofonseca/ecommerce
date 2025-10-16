import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes.js";
import ProductRoutes from "./routes/product.routes.js";
import BrandRoutes from "./routes/brand.routes.js";
import CategoryRoutes from "./routes/category.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userRoutes = new UserRoutes();
const productRoutes = new ProductRoutes();
const brandRoutes = new BrandRoutes();
const categoryRoutes = new CategoryRoutes();

app.use("/user", userRoutes.getRoutes());
app.use("/product", productRoutes.getRoutes());
app.use("/brand", brandRoutes.getRoutes());
app.use("/category", categoryRoutes.getRoutes());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running",
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
