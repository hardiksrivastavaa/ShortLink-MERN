
import express from "express";

import { handleUserDashboard, handleUserLogin, handleUserRegistration } from "../controllers/user.js";

const router = express.Router();

router.post("/register", handleUserRegistration);
router.post("/login", handleUserLogin);
router.get("/dashboard/:userId", handleUserDashboard);

export default router;
