import {Router} from "express";
import {getRes,getHistoricalData} from "../handlers/ResistanceHandler";

const router = Router();

router.get('/res', getRes);
router.get("/history", getHistoricalData);

export default router;