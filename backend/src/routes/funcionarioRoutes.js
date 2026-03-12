import { Router } from "express";
import { createFuncionario, listFuncionarios, toggleFuncionario } from "../controllers/funcionarioController.js";

const router = Router();

router.get("/", listFuncionarios);
router.post("/", createFuncionario);
router.patch("/:id/toggle", toggleFuncionario);

export default router;
