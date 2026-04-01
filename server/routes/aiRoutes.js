import { Router } from "express";
import { postCoach } from "../controllers/aiController.js";

const router = Router();

router.post("/coach", postCoach);

export default router;
