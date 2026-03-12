import { Router } from "express";
import { createSolicitante, listSolicitantes } from "../controllers/solicitanteController.js";

const router = Router();

router.get("/", listSolicitantes);
router.post("/", createSolicitante);

export default router;
