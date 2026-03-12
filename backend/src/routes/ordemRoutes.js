import { Router } from "express";
import { createOrdem, getOrdem, listOrdens, updateOrdem, updateStatusOrdem } from "../controllers/ordemController.js";

const router = Router();

router.get("/", listOrdens);
router.get("/:id", getOrdem);
router.post("/", createOrdem);
router.put("/:id", updateOrdem);
router.patch("/:id/status", updateStatusOrdem);

export default router;
