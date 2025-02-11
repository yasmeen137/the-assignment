import { Request, Response } from "express";
import {
  fetchUserProfile,
  updateUserProfileById,
  deleteUserById,
} from "../services/user";

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId || typeof req.userId !== "number") {
      res.status(401).json({ error: "Unauthorized or missing user ID" });
      return; 
    }

    console.log("🔹 Verifying user:", req.userId);

    const user = await fetchUserProfile(req.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return; 
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "An error occurred while retrieving user data" });
  }
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId || typeof req.userId !== "number") {
      res.status(401).json({ error: "Unauthorized or missing user ID" });
      return;  
    }

    const { username, email } = req.body;

    if (!username || !email) {
      res.status(400).json({ error: "Please fill in all required fields" });
      return;  
    }

    const updatedUser = await updateUserProfileById(req.userId, username, email);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "An error occurred while updating user data" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId || typeof req.userId !== "number") {
      res.status(401).json({ error: "Unauthorized or missing user ID" });
      return;  
    }

    await deleteUserById(req.userId);
    res.clearCookie("refreshToken");
    res.json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "An error occurred while deleting the user account" });
  }
};