const inFlightUploads = new Set();

export const acquireUploadLock = (key) => {
  if (!key) return false;
  if (inFlightUploads.has(key)) return false;
  inFlightUploads.add(key);
  return true;
};

export const releaseUploadLock = (key) => {
  if (!key) return;
  inFlightUploads.delete(key);
};
