import { Router } from "express";
import { createSetor, listSetores, toggleSetor } from "../controllers/setorController.js";

const router = Router();

router.get("/", listSetores);
router.post("/", createSetor);
router.patch("/:id/toggle", toggleSetor);

export default router;
