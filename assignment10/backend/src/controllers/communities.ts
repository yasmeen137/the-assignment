import { Request, Response } from "express";
import prisma from "../../client";
import { describe } from "node:test";

export const getAllCommunities = async (req: Request, res: Response): Promise<void> => {
  try {
    const communities = await prisma.community.findMany({
      include: {
        _count: { select: { members: true } }, 
      },
    });

    res.json(
      communities.map((community) => ({
        id: community.id,
        name: community.name,
        describe: community.description,
        photoUrl: community.photoUrl,
        membersCount: community._count.members, 
      }))
    );
  } catch (error) {
    console.error("Error fetching communities:", error);
    res.status(500).json({ error: "Failed to fetch communities" });
  }
};

export const getCommunityMemberCounts = async (req: Request, res: Response): Promise<void> => {
  try {
    const communityCounts = await prisma.community.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { members: true },
        },
      },
    });

    res.json(communityCounts);
  } catch (error) {
    console.error("Error fetching community member counts:", error);
    res.status(500).json({ error: "Failed to fetch community member counts" });
  }
};

export const joinCommunity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { communityId } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    await prisma.communityMember.create({
      data: { userId, communityId: Number(communityId) },
    });

    res.json({ message: "Joined the community successfully" });
  } catch (error) {
    console.error("Error joining community:", error);
    res.status(500).json({ error: "Failed to join community" });
  }
};

export const leaveCommunity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { communityId } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    await prisma.communityMember.deleteMany({
      where: { userId, communityId: Number( communityId) },
    });

    res.json({ message: "Left the community successfully" });
  } catch (error) {
    console.error("Error leaving community:", error);
    res.status(500).json({ error: "Failed to leave community" });
  }
};

export const getCommunityMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const members = await prisma.user.findMany({
      where: { memberships: { some: { communityId: Number(id) } } },
      select: { id: true, username: true, email: true },
    });

    res.json(members);
  } catch (error) {
    console.error("Error fetching community members:", error);
    res.status(500).json({ error: "Failed to fetch community members" });
  }
};

export const createCommunity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const userId = req.userId; // Ensure authentication middleware sets this

    if (!name || !description) {
      res.status(400).json({ message: "Name and description are required" });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newCommunity = await prisma.community.create({
      data: {
        name,
        description,
        creatorId: userId,
        photoUrl,
      },
    });

    const communityWithCount = await prisma.community.findUnique({
      where: { id: newCommunity.id },
      include: {
        _count: { select: { members: true } },
      },
    });

    res.status(201).json({
      id: communityWithCount?.id,
      name: communityWithCount?.name,
      description: communityWithCount?.description,
      photoUrl: communityWithCount?.photoUrl,
      membersCount: communityWithCount?._count.members || 0,
    });
  } catch (error) {
    console.error("Error creating community:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommunityById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { communityId } = req.params;

    const community = await prisma.community.findUnique({
      where: { id: Number(communityId) },
      include: { _count: { select: { members: true } } },
    });

    if (!community) {
      res.status(404).json({ error: "Community not found" });
      return;
    }

    res.json({
      id: community.id,
      name: community.name,
      describe: community.description,
      membersCount: community._count.members,
    });
  } catch (error) {
    console.error("Error fetching community:", error);
    res.status(500).json({ error: "Failed to fetch community" });
  }
};
