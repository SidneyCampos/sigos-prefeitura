import prisma from "./prisma.js";

const finalStatuses = new Set(["CONCLUIDA", "CANCELADA"]);

function buildOrderWhere(filters) {
  const where = {};

  if (filters.setorId) {
    where.setorResponsavelId = Number(filters.setorId);
  }

  if (filters.prioridade) {
    where.prioridade = filters.prioridade;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.data) {
    const start = new Date(`${filters.data}T00:00:00`);
    const end = new Date(`${filters.data}T23:59:59.999`);
    where.dataAbertura = {
      gte: start,
      lte: end
    };
  }

  return where;
}

export async function listOrders(filters) {
  const page = Number(filters.page || 1);
  const pageSize = Number(filters.pageSize || 10);
  const where = buildOrderWhere(filters);

  const [items, total] = await prisma.$transaction([
    prisma.ordemServico.findMany({
      where,
      orderBy: { numero: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        setorResponsavel: true,
        funcionarioResponsavel: true,
        solicitante: true
      }
    }),
    prisma.ordemServico.count({ where })
  ]);

  return {
    items: items.map((order) => ({
      ...order,
      horaAbertura: new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(order.dataAbertura)
    })),
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize))
    }
  };
}

export async function getOrderById(id) {
  return prisma.ordemServico.findUnique({
    where: { id: Number(id) },
    include: {
      setorResponsavel: true,
      funcionarioResponsavel: true,
      solicitante: true,
      historico: {
        orderBy: { criadoEm: "desc" }
      }
    }
  });
}

export async function createOrder(data) {
  return prisma.$transaction(async (tx) => {
    const lastOrder = await tx.ordemServico.findFirst({
      orderBy: { numero: "desc" },
      select: { numero: true }
    });

    const numero = (lastOrder?.numero || 0) + 1;
    const now = new Date();

    const order = await tx.ordemServico.create({
      data: {
        numero,
        titulo: data.titulo,
        descricao: data.descricao,
        prioridade: data.prioridade,
        status: data.status || "ABERTA",
        setorResponsavelId: Number(data.setorResponsavelId),
        funcionarioResponsavelId: data.funcionarioResponsavelId ? Number(data.funcionarioResponsavelId) : null,
        solicitanteId: Number(data.solicitanteId),
        observacoes: data.observacoes || null,
        dataAbertura: now,
        dataConclusao: data.status === "CONCLUIDA" ? now : null
      },
      include: {
        setorResponsavel: true,
        funcionarioResponsavel: true,
        solicitante: true
      }
    });

    await tx.ordemServicoHistorico.create({
      data: {
        ordemServicoId: order.id,
        acao: "CRIACAO",
        descricao: `Ordem #${order.numero} criada com status ${order.status}.`
      }
    });

    return order;
  });
}

export async function updateOrder(id, data) {
  const orderId = Number(id);

  return prisma.$transaction(async (tx) => {
    const currentOrder = await tx.ordemServico.findUnique({
      where: { id: orderId }
    });

    if (!currentOrder) {
      const error = new Error("Ordem de servico nao encontrada.");
      error.statusCode = 404;
      throw error;
    }

    const nextStatus = data.status || currentOrder.status;
    const shouldCloseDate = nextStatus === "CONCLUIDA" && !currentOrder.dataConclusao;

    const updatedOrder = await tx.ordemServico.update({
      where: { id: orderId },
      data: {
        titulo: data.titulo ?? currentOrder.titulo,
        descricao: data.descricao ?? currentOrder.descricao,
        prioridade: data.prioridade ?? currentOrder.prioridade,
        status: nextStatus,
        setorResponsavelId: data.setorResponsavelId ? Number(data.setorResponsavelId) : currentOrder.setorResponsavelId,
        funcionarioResponsavelId: data.funcionarioResponsavelId !== undefined
          ? data.funcionarioResponsavelId
            ? Number(data.funcionarioResponsavelId)
            : null
          : currentOrder.funcionarioResponsavelId,
        solicitanteId: data.solicitanteId ? Number(data.solicitanteId) : currentOrder.solicitanteId,
        observacoes: data.observacoes !== undefined ? data.observacoes || null : currentOrder.observacoes,
        dataConclusao: shouldCloseDate
          ? new Date()
          : nextStatus !== "CONCLUIDA" && !finalStatuses.has(nextStatus)
            ? null
            : currentOrder.dataConclusao
      },
      include: {
        setorResponsavel: true,
        funcionarioResponsavel: true,
        solicitante: true
      }
    });

    await tx.ordemServicoHistorico.create({
      data: {
        ordemServicoId: updatedOrder.id,
        acao: "ATUALIZACAO",
        descricao: `Ordem #${updatedOrder.numero} atualizada. Status atual: ${updatedOrder.status}.`
      }
    });

    return updatedOrder;
  });
}

export async function updateOrderStatus(id, status, observacoes) {
  const orderId = Number(id);

  return prisma.$transaction(async (tx) => {
    const currentOrder = await tx.ordemServico.findUnique({
      where: { id: orderId }
    });

    if (!currentOrder) {
      const error = new Error("Ordem de servico nao encontrada.");
      error.statusCode = 404;
      throw error;
    }

    const updatedOrder = await tx.ordemServico.update({
      where: { id: orderId },
      data: {
        status,
        observacoes: observacoes !== undefined ? observacoes || null : currentOrder.observacoes,
        dataConclusao: status === "CONCLUIDA" ? new Date() : null
      },
      include: {
        setorResponsavel: true,
        funcionarioResponsavel: true,
        solicitante: true
      }
    });

    await tx.ordemServicoHistorico.create({
      data: {
        ordemServicoId: updatedOrder.id,
        acao: "STATUS",
        descricao: `Status alterado para ${status}.`
      }
    });

    return updatedOrder;
  });
}
