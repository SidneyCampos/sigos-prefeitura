import api from "./api";

export function getSetores() {
  return api.get("/setores").then((response) => response.data);
}

export function createSetor(payload) {
  return api.post("/setores", payload).then((response) => response.data);
}

export function toggleSetor(id) {
  return api.patch(`/setores/${id}/toggle`).then((response) => response.data);
}

export function getFuncionarios(params) {
  return api.get("/funcionarios", { params }).then((response) => response.data);
}

export function createFuncionario(payload) {
  return api.post("/funcionarios", payload).then((response) => response.data);
}

export function toggleFuncionario(id) {
  return api.patch(`/funcionarios/${id}/toggle`).then((response) => response.data);
}

export function getSolicitantes(params) {
  return api.get("/solicitantes", { params }).then((response) => response.data);
}

export function createSolicitante(payload) {
  return api.post("/solicitantes", payload).then((response) => response.data);
}
