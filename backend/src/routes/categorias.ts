import { Router } from "express"
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient()

const router = Router()

router.get("/", async (req, res) => {
    const categorias = await prisma.categoria.findMany()
    res.status(200).json([categorias])
})

router.post("/", async (req, res) => {
    const { nome } = req.body

    if (!nome) res.status(400).json({erro: "Nome inválido"})

    const categoria = await prisma.categoria.create({
        data: { nome }
    })

    res.status(201).json(categoria)
})

export default router
