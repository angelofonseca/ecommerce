import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js"
import brandRoutes from "./routes/brand.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import userRoutes from "./routes/user.routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();


app.use(cors());
app.use(express.json());

app.use("/product", productRoutes);
app.use("/brand", brandRoutes);
app.use("/category", categoryRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server on Port: ${PORT}`);
});
