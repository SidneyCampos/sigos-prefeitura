import prisma from "../services/prisma.js";

export async function listFuncionarios(req, res, next) {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 10);

    const [items, total] = await prisma.$transaction([
      prisma.funcionario.findMany({
        orderBy: { nome: "asc" },
        include: { setor: true },
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.funcionario.count()
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

export async function createFuncionario(req, res, next) {
  try {
    const { nome, setorId } = req.body;

    if (!nome || !setorId) {
      return res.status(400).json({ message: "Nome e setor do funcionario sao obrigatorios." });
    }

    const funcionario = await prisma.funcionario.create({
      data: {
        nome,
        setorId: Number(setorId),
        ativo: true
      },
      include: { setor: true }
    });

    res.status(201).json(funcionario);
  } catch (error) {
    next(error);
  }
}

export async function toggleFuncionario(req, res, next) {
  try {
    const id = Number(req.params.id);
    const funcionario = await prisma.funcionario.findUnique({ where: { id } });

    if (!funcionario) {
      return res.status(404).json({ message: "Funcionario nao encontrado." });
    }

    const updated = await prisma.funcionario.update({
      where: { id },
      data: { ativo: !funcionario.ativo },
      include: { setor: true }
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
}
