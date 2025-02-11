import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../client";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      let token = req.headers.authorization?.split(" ")[1];

      if (!token) {
          res.status(401).json({ error: "Unauthorized - No Token Provided" });
          return;
      }

      try {
          // ✅ حاول التحقق من `accessToken`
          const decoded = jwt.verify(token.trim(), JWT_SECRET) as { userId: number };
          req.userId = decoded.userId;
          return next();
      } catch (error) {
          if (error instanceof jwt.TokenExpiredError) {
              console.log("⚠️ Access Token Expired. Trying to refresh...");

              // ✅ جلب `refreshToken` من الكوكيز
              const refreshToken = req.cookies?.refreshToken;
              if (!refreshToken) {
                  res.status(401).json({ error: "Unauthorized - No Refresh Token" });
                  return;
              }

              try {
                  // ✅ تحقق من `refreshToken`
                  const decodedRefresh = jwt.verify(refreshToken, JWT_SECRET) as { userId: number };
                  req.userId = decodedRefresh.userId;

                  // ✅ إنشاء `accessToken` جديد مباشرةً
                  const newAccessToken = jwt.sign({ userId: decodedRefresh.userId }, JWT_SECRET, {
                      expiresIn: "15m",
                  });

                  console.log("✅ New Access Token Issued");

                  // ✅ إرسال `accessToken` الجديد في الهيدر ليتلقاه الفرونت إند
                  res.setHeader("Authorization", `Bearer ${newAccessToken}`);

                  return next();
              } catch (refreshError) {
                  console.error("🚨 Refresh Token Invalid:", refreshError);
                  res.status(403).json({ error: "Forbidden - Invalid Refresh Token" });
                  return;
              }
          }

          console.error("🚨 Invalid Access Token:", error);
          res.status(403).json({ error: "Forbidden - Invalid Token" });
          return;
      }
  } catch (error) {
      console.error("🚨 Authentication Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

export const authorize = (roles: string[]) => async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized - No User ID" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden - Insufficient Permissions" });
    }

    console.log("Authorized User:", user.username, "Role:", user.role);
    next();
  } catch (error) {
    console.error("Authorization Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};