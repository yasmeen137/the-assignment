import express from "express";
import { createComment, getComments } from "../controllers/comments";
import { authenticate } from "../middleware/auth"; // ✅ Import the authentication middleware

const commentRouter = express.Router({ mergeParams: true });

// ✅ Fetch all comments for a thread
commentRouter.get("/", getComments);

// ✅ Post a comment to a thread (Requires authentication)
commentRouter.post("/", authenticate, createComment);

export default commentRouter;