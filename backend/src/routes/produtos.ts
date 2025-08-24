import { Router } from "express"
import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient()

const router = Router()

router.get("/", async (req, res) => {
    const produtos = await prisma.produto.findMany()
    res.status(200).json([produtos])
})

router.post("/", async (req, res) => {
    const { nome, foto, descricao, preco, categoriaId, marcaId } = req.body

    if (!nome || !foto || !descricao || !preco || !categoriaId || !marcaId) {
        res.status(400).json({erro: "Erro: Enviar todos os atributos"})
        return
    }

    const produto = await prisma.produto.create({
        data: {
            nome,
            foto,
            descricao,
            preco,
            categoriaId,
            marcaId
        }
    })

    res.status(201).json(produto)
})

export default router