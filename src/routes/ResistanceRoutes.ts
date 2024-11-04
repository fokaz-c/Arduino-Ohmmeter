// routes/users.ts
import {Router} from "express";
import {getRes} from "../handlers/ResistanceHandler";

const router = Router();

router.get('/res', getRes);
//router.get("/:id", getUserById);

export default router;