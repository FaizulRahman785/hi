import { Router, type IRouter } from "express";
import healthRouter from "./health.js";

interface ProfilePayload {
  email?: string;
  fullName?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  college?: string;
  degree?: string;
  branch?: string;
  graduationYear?: string;
  currentStatus?: string;
  skills?: string[];
  interests?: string;
  preferredCareerPaths?: string;
  preferredJobLocations?: string;
  workMode?: string;
  bio?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  profilePhotoUrl?: string;
  onboardingCompleted?: boolean;
  profileCompletion?: number;
  updatedAt?: string;
}

const router = Router();
const profiles = new Map<string, ProfilePayload>();

router.use(healthRouter);

router.get("/profile", (req: any, res: any) => {
  const email = typeof req.query.email === "string" ? req.query.email : undefined;
  if (!email) {
    res.status(400).json({ error: "An email query is required." });
    return;
  }

  const stored = profiles.get(email);
  if (!stored) {
    res.status(404).json({ error: "Profile not found." });
    return;
  }

  res.json(stored);
});

router.post("/profile", (req: any, res: any) => {
  const payload = req.body as ProfilePayload;
  if (!payload?.email) {
    res.status(400).json({ error: "Profile email is required." });
    return;
  }

  const nextPayload = {
    ...payload,
    updatedAt: payload.updatedAt ?? new Date().toISOString(),
  };

  profiles.set(payload.email, nextPayload);
  res.json(nextPayload);
});

router.post("/uploads/cloudinary-sign", async (req: any, res: any) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    res.status(500).json({ error: "Cloudinary credentials are not configured." });
    return;
  }

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = {
    timestamp,
    folder: req.body?.folder ?? "mb-career-connect",
  };

  const crypto = await import("node:crypto");
  const signature = crypto
    .createHash("sha256")
    .update(
      Object.entries(paramsToSign)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join("&") + apiSecret,
    )
    .digest("hex");

  res.json({
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder: paramsToSign.folder,
  });
});

export default router;
