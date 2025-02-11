import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import communityRoutes from "./routes/communities";
import threadRoutes from "./routes/threads";
import commentRoutes from "./routes/comments";

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.use(cookieParser());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); 
// Routes
app.use("/auth", authRoutes);
app.use("/profile", userRoutes);
app.use("/communities", communityRoutes);
app.use("/threads", threadRoutes);
app.use("/comments", commentRoutes);

export default app;