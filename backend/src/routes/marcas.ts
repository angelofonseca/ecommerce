import { Router } from "express"
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient()

const router = Router()

router.get("/", async (req, res) => {
    const marcas = await prisma.marca.findMany()
    res.status(200).json([marcas])
})

router.post("/", async (req, res) => {
    const { nome } = req.body

    if (!nome) res.status(400).json({erro: "Nome inválido"})

    const marca = await prisma.marca.create({
        data: { nome }
    })

    res.status(201).json(marca)
})

export default router
