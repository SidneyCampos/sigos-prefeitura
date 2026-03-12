import prisma from "../services/prisma.js";

export async function listSolicitantes(req, res, next) {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 10);

    const [items, total] = await prisma.$transaction([
      prisma.solicitante.findMany({
        orderBy: { nome: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.solicitante.count()
    ]);

    res.json({
      items,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize))
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function createSolicitante(req, res, next) {
  try {
    const { nome, telefone, setor } = req.body;

    if (!nome) {
      return res.status(400).json({ message: "Nome do solicitante e obrigatorio." });
    }

    const solicitante = await prisma.solicitante.create({
      data: {
        nome,
        telefone: telefone || null,
        setor: setor || null
      }
    });

    res.status(201).json(solicitante);
  } catch (error) {
    next(error);
  }
}
