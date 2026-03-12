import { createOrder, getOrderById, listOrders, updateOrder, updateOrderStatus } from "../services/orderService.js";

export async function listOrdens(req, res, next) {
  try {
    const data = await listOrders(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getOrdem(req, res, next) {
  try {
    const ordem = await getOrderById(req.params.id);

    if (!ordem) {
      return res.status(404).json({ message: "Ordem de servico nao encontrada." });
    }

    res.json(ordem);
  } catch (error) {
    next(error);
  }
}

export async function createOrdem(req, res, next) {
  try {
    const { titulo, descricao, prioridade, setorResponsavelId, solicitanteId } = req.body;

    if (!titulo || !descricao || !prioridade || !setorResponsavelId || !solicitanteId) {
      return res.status(400).json({
        message: "Titulo, descricao, prioridade, setor responsavel e solicitante sao obrigatorios."
      });
    }

    const ordem = await createOrder(req.body);
    res.status(201).json(ordem);
  } catch (error) {
    next(error);
  }
}

export async function updateOrdem(req, res, next) {
  try {
    const ordem = await updateOrder(req.params.id, req.body);
    res.json(ordem);
  } catch (error) {
    next(error);
  }
}

export async function updateStatusOrdem(req, res, next) {
  try {
    const { status, observacoes } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status e obrigatorio." });
    }

    const ordem = await updateOrderStatus(req.params.id, status, observacoes);
    res.json(ordem);
  } catch (error) {
    next(error);
  }
}
