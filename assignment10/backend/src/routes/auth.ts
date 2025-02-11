import express from "express";
import { login, register, refreshAccessToken, logout } from "../controllers/auth"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken); 
router.post("/logout", logout);
export default router;