import { Router } from "express"
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient()

const router = Router()

router.get("/", async (req, res) => {
    const categories = await prisma.category.findMany()
    res.status(200).json([categories])
})

router.post("/", async (req, res) => {
    const { name } = req.body

    if (!name) res.status(400).json({erro: "Invalid category"})

    const category = await prisma.category.create({
        data: { name }
    })

    res.status(201).json(category)
})

export default router
