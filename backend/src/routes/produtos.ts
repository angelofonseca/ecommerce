import { Router } from "express"
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient()

const router = Router()

router.get("/", async (req, res) => {
    const products = await prisma.product.findMany()
    res.status(200).json([products])
})

router.post("/", async (req, res) => {
    const { name, photo, description, price, categoryId, brandId } = req.body

    if (!name || !photo || !description || !price || !categoryId || !brandId) {
        res.status(400).json({erro: "Erro: Enviar todos os atributos"})
        return
    }

    const product = await prisma.product.create({
        data: {
            name,
            photo,
            description,
            price,
            categoryId,
            brandId
        }
    })

    res.status(201).json(product)
})

export default router