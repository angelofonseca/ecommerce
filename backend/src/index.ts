import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes.js";
import ProductRoutes from "./routes/product.routes.js";
import BrandRoutes from "./routes/brand.routes.js";
import CategoryRoutes from "./routes/category.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

const prismaProduct = new ProductRoutes();
const prismaBrand = new BrandRoutes();
const prismaCategory = new CategoryRoutes();
const prismaUser = new UserRoutes();

app.use("/product", prismaProduct.getRoutes());
app.use("/brand", prismaBrand.getRoutes());
app.use("/category", prismaCategory.getRoutes());
app.use("/user", prismaUser.getRoutes());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server on Port: ${PORT}`);
});
