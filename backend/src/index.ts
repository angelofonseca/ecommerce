import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes.js";
import CRUDRoutes from "./routes/crud.routes.js";
import prisma from "./database/prismaClient.js";
import CRUDModel from "./models/CRUDModel.js";
import ProductRoutes from "./routes/product.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

const prismaProduct = new ProductRoutes();
const prismaBrand = new CRUDRoutes(new CRUDModel(prisma.brand));
const prismaCategory = new CRUDRoutes(new CRUDModel(prisma.category));

app.use("/product", prismaProduct.getRoutes());
app.use("/brand", prismaBrand.getRoutes());
app.use("/category", prismaCategory.getRoutes());
app.use("/user", new UserRoutes().getRoutes());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server on Port: ${PORT}`);
});
