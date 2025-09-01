import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import Route from "./routes/CRUDRoutes.js";
import prisma from "./database/prismaClient.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/product", new Route(prisma.product).getRoutes());
app.use("/brand", new Route(prisma.brand).getRoutes());
app.use("/category", new Route(prisma.category).getRoutes());
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server on Port: ${PORT}`);
});
