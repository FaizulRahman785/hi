import { Router, type IRouter } from "express";
import healthRouter from "./health.js";

interface ProfilePayload {
  uid?: string;
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

interface FirebaseLookupResponse {
  users?: Array<{ localId?: string; email?: string }>;
}

const router = Router();
const profiles = new Map<string, ProfilePayload>();
const allowedCloudinaryFolders = new Set([
  "mb-career-connect",
  "profile-photos",
  "resumes",
  "cover-images",
]);

router.use(healthRouter);

function getBearerToken(req: any) {
  const header = typeof req.headers.authorization === "string" ? req.headers.authorization : "";
  const [scheme, token] = header.split(" ");
  return scheme?.toLowerCase() === "bearer" && token ? token : null;
}

async function verifyFirebaseUser(req: any) {
  const token = getBearerToken(req);
  if (!token) return null;

  const apiKey = process.env.FIREBASE_WEB_API_KEY ?? process.env.VITE_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error("Firebase token verification is not configured.");
  }

  const response = (await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: token }),
  })) as any;

  if (!response.ok) return null;

  const payload = (await response.json()) as FirebaseLookupResponse;
  const user = payload.users?.[0];
  return user?.localId ? { uid: user.localId, email: user.email } : null;
}

function getRequestedUploadFolder(value: unknown) {
  const folder = typeof value === "string" && value.trim() ? value.trim() : "mb-career-connect";
  return allowedCloudinaryFolders.has(folder) ? folder : null;
}

router.get("/profile", (req: any, res: any) => {
  const uid = typeof req.query.uid === "string" ? req.query.uid : undefined;
  if (!uid) {
    res.status(400).json({ error: "A uid query is required." });
    return;
  }

  const stored = profiles.get(uid);
  if (!stored) {
    res.status(404).json({ error: "Profile not found." });
    return;
  }

  res.json(stored);
});

router.post("/profile", (req: any, res: any) => {
  const payload = req.body as ProfilePayload;
  if (!payload?.uid) {
    res.status(400).json({ error: "Profile uid is required." });
    return;
  }

  const nextPayload = {
    ...payload,
    updatedAt: payload.updatedAt ?? new Date().toISOString(),
  };

  profiles.set(payload.uid, nextPayload);
  res.json(nextPayload);
});

router.post("/uploads/cloudinary-sign", async (req: any, res: any) => {
  let firebaseUser: { uid: string; email?: string } | null = null;
  try {
    firebaseUser = await verifyFirebaseUser(req);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Firebase token verification failed." });
    return;
  }

  if (!firebaseUser) {
    res.status(401).json({ error: "A valid Firebase ID token is required." });
    return;
  }

  const folder = getRequestedUploadFolder(req.body?.folder);
  if (!folder) {
    res.status(400).json({ error: "Upload folder is not allowed." });
    return;
  }

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
    folder,
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
    folder,
  });
});

export default router;
