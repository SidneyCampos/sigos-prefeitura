import api from "./api";

export function getDashboard() {
  return api.get("/dashboard").then((response) => response.data);
}
