import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes.js";
import ProductRoutes from "./routes/product.routes.js";
import BrandRoutes from "./routes/brand.routes.js";
import CategoryRoutes from "./routes/category.routes.js";
import WebhookController from "./controllers/WebhookController.js";
import checkoutRouter from "./routes/checkout.routes.js";
import salesRouter from "./routes/sales.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import webhookRouter from "./routes/webhook.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ⚠️ IMPORTANTE: Webhook DEVE vir ANTES do express.json()
// O Stripe precisa do body RAW para verificar a assinatura
// app.post(
//   '/webhook',
//   express.raw({ type: 'application/json' }),
//   (req, res) => WebhookController.handleStripeWebhook(req, res)
// );
app.use("/", webhookRouter);

// Agora sim pode processar JSON para os outros endpoints
app.use(express.json());

const userRoutes = new UserRoutes();
const productRoutes = new ProductRoutes();
const brandRoutes = new BrandRoutes();
const categoryRoutes = new CategoryRoutes();

app.use("/user", userRoutes.getRoutes());
app.use("/product", productRoutes.getRoutes());
app.use("/brand", brandRoutes.getRoutes());
app.use("/category", categoryRoutes.getRoutes());
app.use("/checkout", checkoutRouter);
app.use("/sales", salesRouter);
app.use("/payment", paymentRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
