import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configuredUploadsRoot = (process.env.UPLOADS_ROOT || "").trim();

const resolveUploadsRoot = () => {
  if (!configuredUploadsRoot) {
    // Default to repo-level uploads folder for local development.
    return path.resolve(__dirname, "..", "..", "uploads");
  }

  if (path.isAbsolute(configuredUploadsRoot)) {
    return configuredUploadsRoot;
  }

  // Allow relative paths from backend directory if needed.
  return path.resolve(__dirname, "..", configuredUploadsRoot);
};

export const UPLOADS_ROOT = resolveUploadsRoot();
export const PET_UPLOADS_DIR = path.join(UPLOADS_ROOT, "pets");
export const FORUM_UPLOADS_DIR = path.join(UPLOADS_ROOT, "forum");
export const MEDICAL_UPLOADS_DIR = path.join(UPLOADS_ROOT, "medical_records");
