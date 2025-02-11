import express from "express";
import { getUserProfile, updateUserProfile, deleteUser } from "../controllers/user";
import { authenticate } from "../middleware/auth";

const userRouter = express.Router();

userRouter.get("/", authenticate, getUserProfile);
userRouter.put("/", authenticate, updateUserProfile);
userRouter.delete("/", authenticate, deleteUser);

export default userRouter;