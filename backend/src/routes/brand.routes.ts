import { Router } from "express";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

const router = Router();

router.get("/", async (req, res) => {
  const brands = await prisma.brand.findMany();
  res.status(200).json([brands]);
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) res.status(400).json({ erro: "Invalid brand" });

  const brand = await prisma.brand.create({
    data: { name },
  });

  res.status(201).json(brand);
});

export default router;
