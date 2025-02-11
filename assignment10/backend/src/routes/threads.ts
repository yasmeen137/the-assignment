import express from "express";
import commentRouter from "./comments";
import {
  createThread,
  getThreads,
  getThreadById,
  updateThread,
  deleteThread,
} from "../controllers/threads";
import { authenticate } from "./../middleware/auth";

const threadRouter = express.Router({ mergeParams: true });

threadRouter.post("/",  authenticate, createThread);
threadRouter.get("/", getThreads);
threadRouter.get("/:threadId", getThreadById);
threadRouter.put("/:threadId", authenticate, updateThread);
threadRouter.delete("/:threadId", authenticate, deleteThread);

// Nest comment routes inside a thread
threadRouter.use("/:threadId/comments", commentRouter);

export default threadRouter;