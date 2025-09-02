import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes.js";
import CRUDRoutes from "./routes/crud.routes.js";
import prisma from "./database/prismaClient.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/product", new CRUDRoutes(prisma.product).getRoutes());
app.use("/brand", new CRUDRoutes(prisma.brand).getRoutes());
app.use("/category", new CRUDRoutes(prisma.category).getRoutes());
app.use("/user", new UserRoutes().getRoutes());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server on Port: ${PORT}`);
});
