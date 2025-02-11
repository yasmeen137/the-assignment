import prisma from "../../client";

export const fetchUserProfile = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, email: true, role: true },
  });
};

export const updateUserProfileById = async (userId: number, username: string, email: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { username, email },
    select: { id: true, username: true, email: true, role: true },
  });
};

export const deleteUserById = async (userId: number) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};