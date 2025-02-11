import prisma from "../../client";

export const fetchAllCommunities = async () => {
  return await prisma.community.findMany({
    include: {
      _count: { select: { members: true } },
    },
  });
};

export const fetchCommunityMemberCounts = async () => {
  return await prisma.community.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: { members: true },
      },
    },
  });
};

export const addUserToCommunity = async (userId: number, communityId: number) => {
  return await prisma.communityMember.create({
    data: { userId, communityId },
  });
};

export const removeUserFromCommunity = async (userId: number, communityId: number) => {
  return await prisma.communityMember.deleteMany({
    where: { userId, communityId },
  });
};

export const fetchCommunityMembers = async (communityId: number) => {
  return await prisma.user.findMany({
    where: { memberships: { some: { communityId } } },
    select: { id: true, username: true, email: true },
  });
};

export const createNewCommunity = async (
  name: string,
  description: string,
  userId: number,
  photoUrl: string | null
) => {
  const newCommunity = await prisma.community.create({
    data: {
      name,
      description,
      creatorId: userId,
      photoUrl,
    },
  });

  return await prisma.community.findUnique({
    where: { id: newCommunity.id },
    include: { _count: { select: { members: true } } },
  });
};

export const fetchCommunityById = async (communityId: number) => {
  return await prisma.community.findUnique({
    where: { id: communityId },
    include: { _count: { select: { members: true } } },
  });
};