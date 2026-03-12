import prisma from "../services/prisma.js";

export async function listSetores(req, res, next) {
  try {
    const setores = await prisma.setor.findMany({
      orderBy: { nome: "asc" }
    });

    res.json(setores);
  } catch (error) {
    next(error);
  }
}

export async function createSetor(req, res, next) {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ message: "Nome do setor e obrigatorio." });
    }

    const setor = await prisma.setor.create({
      data: { nome, ativo: true }
    });

    res.status(201).json(setor);
  } catch (error) {
    next(error);
  }
}

export async function toggleSetor(req, res, next) {
  try {
    const id = Number(req.params.id);
    const setor = await prisma.setor.findUnique({ where: { id } });

    if (!setor) {
      return res.status(404).json({ message: "Setor nao encontrado." });
    }

    const updated = await prisma.setor.update({
      where: { id },
      data: { ativo: !setor.ativo }
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
}
