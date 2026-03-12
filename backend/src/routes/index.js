import { Router } from "express";
import dashboardRoutes from "./dashboardRoutes.js";
import funcionarioRoutes from "./funcionarioRoutes.js";
import ordemRoutes from "./ordemRoutes.js";
import setorRoutes from "./setorRoutes.js";
import solicitanteRoutes from "./solicitanteRoutes.js";

const router = Router();

router.use("/dashboard", dashboardRoutes);
router.use("/setores", setorRoutes);
router.use("/funcionarios", funcionarioRoutes);
router.use("/solicitantes", solicitanteRoutes);
router.use("/ordens", ordemRoutes);

export default router;
