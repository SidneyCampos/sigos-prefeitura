import prisma from "../services/prisma.js";

export async function getDashboard(req, res, next) {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const [abertas, emExecucao, concluidasHoje, porSetor, porStatus, recentes] = await Promise.all([
      prisma.ordemServico.count({
        where: {
          status: {
            in: ["ABERTA", "EM_ANALISE", "EM_EXECUCAO", "AGUARDANDO"]
          }
        }
      }),
      prisma.ordemServico.count({
        where: { status: "EM_EXECUCAO" }
      }),
      prisma.ordemServico.count({
        where: {
          status: "CONCLUIDA",
          dataConclusao: {
            gte: start,
            lte: end
          }
        }
      }),
      prisma.setor.findMany({
        orderBy: { nome: "asc" },
        include: {
          _count: {
            select: { ordens: true }
          }
        }
      }),
      prisma.ordemServico.groupBy({
        by: ["status"],
        _count: {
          _all: true
        }
      }),
      prisma.ordemServico.findMany({
        take: 5,
        orderBy: { dataAbertura: "desc" },
        include: {
          setorResponsavel: true
        }
      })
    ]);

    res.json({
      totais: {
        abertas,
        emExecucao,
        concluidasHoje
      },
      ordensPorSetor: porSetor.map((setor) => ({
        nome: setor.nome,
        total: setor._count.ordens
      })),
      ordensPorStatus: porStatus.map((item) => ({
        status: item.status,
        total: item._count._all
      })),
      recentes
    });
  } catch (error) {
    next(error);
  }
}
