import { Request, Response } from "express";
import { createNewComment, fetchCommentsByThreadId } from "../services/comments";

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body;
    const { threadId } = req.params;
    const authorId = req.userId;

    if (!authorId) {
      res.status(401).json({ error: "Unauthorized - User not logged in" });
      return;
    }

    if (!content.trim()) {
      res.status(400).json({ error: "Comment content cannot be empty" });
      return;
    }

    const comment = await createNewComment(content, parseInt(threadId, 10), authorId);
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const getComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { threadId } = req.params;

    const comments = await fetchCommentsByThreadId(parseInt(threadId, 10));
    res.json(comments);
  } catch (error) {
    console.error(" Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};