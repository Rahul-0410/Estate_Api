import express from "express"
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.js";

const router= express.Router();

router.post("/should-be-logged-in", shouldBeLoggedIn)
router.post("/should-be-admin",shouldBeAdmin)

export default router;