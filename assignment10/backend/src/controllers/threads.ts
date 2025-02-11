import { Request, Response, NextFunction } from "express";
import prisma from "../../client";

// Extend Request type to include `user`
interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

// Create a new thread
export const createThread = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, content } = req.body;
    const { communityId } = req.params;

    if (!title || typeof title !== "string") {
      res.status(400).json({ error: "Title is required and must be a string" });
      return;
    }
    if (!content || typeof content !== "string") {
      res.status(400).json({ error: "Content is required and must be a string" });
      return;
    }

    if(!req.userId || typeof req.userId !== "number") {
      res.status(400).json({ error: "User is not authenticated" });
    }

    const newThread = await prisma.thread.create({
      data: {
        title,
        content,
        communityId: Number(communityId),
        authorId: req.userId || 0,
      },
    });

    res.status(201).json(newThread);
  } catch (error) {
    next(error);
  }
};

// Get all threads
export const getThreads = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { communityId } = req.params;
    const threads = await prisma.thread.findMany({
      where: { communityId: Number(communityId) },
      include: { author: true, comments: true },
    });

    res.json(threads);
  } catch (error) {
    next(error);
  }
};

// Get a specific thread by ID
export const getThreadById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { threadId } = req.params;

    if (isNaN(Number(threadId))) {
      res.status(400).json({ error: "Invalid thread ID" });
      return;
    }

    const thread = await prisma.thread.findUnique({
      where: { id: Number(threadId) },
      include: { author: true, comments: true },
    });

    if (!thread) {
      res.status(404).json({ error: "Thread not found" });
      return;
    }

    res.json(thread);
  } catch (error) {
    next(error);
  }
};

// Update a thread
export const updateThread = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { threadId } = req.params;
    const { title, content } = req.body;

    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (isNaN(Number(threadId))) {
      res.status(400).json({ error: "Invalid thread ID" });
      return;
    }

    const thread = await prisma.thread.findUnique({
      where: { id: Number(threadId) },
    });

    if (!thread) {
      res.status(404).json({ error: "Thread not found" });
      return;
    }

    if (thread.authorId !== req.user.id) {
      res.status(403).json({ error: "Forbidden: You can only edit your own thread" });
      return;
    }

    const updatedThread = await prisma.thread.update({
      where: { id: Number(threadId) },
      data: { title, content },
    });

    res.json(updatedThread);
  } catch (error) {
    next(error);
  }
};

// Delete a thread
export const deleteThread = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { threadId } = req.params;

    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (isNaN(Number(threadId))) {
      res.status(400).json({ error: "Invalid thread ID" });
      return;
    }

    const thread = await prisma.thread.findUnique({
      where: { id: Number(threadId) },
    });

    if (!thread) {
      res.status(404).json({ error: "Thread not found" });
      return;
    }

    if (thread.authorId !== req.user.id) {
      res.status(403).json({ error: "Forbidden: You can only delete your own thread" });
      return;
    }

    await prisma.thread.delete({
      where: { id: Number(threadId) },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};