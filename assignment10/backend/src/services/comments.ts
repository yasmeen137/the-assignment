import prisma from "../../client";

export const createNewComment = async (content: string, threadId: number, authorId: number) => {
  return await prisma.comment.create({
    data: {
      content,
      threadId,
      authorId,
    },
    include: {
      author: { select: { id: true, username: true } },
    },
  });
};

export const fetchCommentsByThreadId = async (threadId: number) => {
  return await prisma.comment.findMany({
    where: { threadId },
    orderBy: { id: "desc" },
    include: {
      author: { select: { id: true, username: true } },
    },
  });
};