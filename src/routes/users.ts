// routes/users.ts
import { Router } from "express";
import { getRes, getUserById } from "../handlers/users";

const router = Router();

router.get('/res', getRes);
router.get("/:id", getUserById);

export default router;