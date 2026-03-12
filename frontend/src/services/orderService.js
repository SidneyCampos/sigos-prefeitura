import api from "./api";

export function getOrdens(params) {
  return api.get("/ordens", { params }).then((response) => response.data);
}

export function getOrdem(id) {
  return api.get(`/ordens/${id}`).then((response) => response.data);
}

export function createOrdem(payload) {
  return api.post("/ordens", payload).then((response) => response.data);
}

export function updateOrdem(id, payload) {
  return api.put(`/ordens/${id}`, payload).then((response) => response.data);
}

export function updateStatusOrdem(id, payload) {
  return api.patch(`/ordens/${id}/status`, payload).then((response) => response.data);
}
