import prisma from "../../client";

export const createNewThread = async (
  title: string,
  content: string,
  communityId: number,
  authorId: number
) => {
  return await prisma.thread.create({
    data: { title, content, communityId, authorId },
  });
};

export const fetchThreadsByCommunity = async (communityId: number) => {
  return await prisma.thread.findMany({
    where: { communityId },
    include: { author: true, comments: true },
  });
};

export const fetchThreadById = async (threadId: number) => {
  return await prisma.thread.findUnique({
    where: { id: threadId },
    include: { author: true, comments: true },
  });
};

export const updateThreadById = async (threadId: number, title: string, content: string) => {
  return await prisma.thread.update({
    where: { id: threadId },
    data: { title, content },
  });
};

export const deleteThreadById = async (threadId: number) => {
  return await prisma.thread.delete({
    where: { id: threadId },
  });
};