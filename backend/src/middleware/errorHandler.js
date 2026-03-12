export function notFoundHandler(req, res) {
  res.status(404).json({ message: "Rota nao encontrada." });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  res.status(error.statusCode || 500).json({
    message: error.message || "Erro interno do servidor."
  });
}
