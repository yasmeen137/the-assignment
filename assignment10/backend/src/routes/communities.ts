import express from "express";
import upload from "../middleware/multer"; // Import multer middleware
import {
  getAllCommunities,
  getCommunityById,
  joinCommunity,
  leaveCommunity,
  createCommunity,
  getCommunityMemberCounts,
} from "../controllers/communities";
import { authenticate } from "../middleware/auth";
import threadRouter from "./threads";

const communityRouter = express.Router({ mergeParams: true });
communityRouter.get("/", getAllCommunities);
communityRouter.get("/:communityId", getCommunityById); 
communityRouter.post("/:communityId/join", joinCommunity);
communityRouter.post("/:communityId/leave", leaveCommunity);
communityRouter.post("/", authenticate, upload.single("photo"), createCommunity); // Apply multer middleware for image uploads
communityRouter.use("/:communityId/threads", threadRouter);
communityRouter.get("/analytics/member-counts", getCommunityMemberCounts);
export default communityRouter;