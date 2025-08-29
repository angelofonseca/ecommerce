import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import produtosRoutes from "./routes/produtos.js"
import marcasRoutes from "./routes/marcas.js"
import categoriasRoutes from "./routes/categorias.js"
import userRoute from "./routes/user.routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();


app.use(cors());
app.use(express.json());

app.use("/produtos", produtosRoutes);
app.use("/marcas", marcasRoutes);
app.use("/categorias", categoriasRoutes);

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("API Working");
});

try {
  app.listen(PORT, () => {
    console.log(`Server on Port: ${PORT}`);
  });
} catch (e) {
  console.error("Startup error:", e);
}