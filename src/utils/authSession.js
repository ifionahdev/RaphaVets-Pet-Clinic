const AUTH_STORAGE_KEYS = [
  "token",
  "userId",
  "userRole",
  "user",
  "petsCacheTimestamp",
  "selectedPet",
  "cachedPets",
];

const AUTH_BACKUP_KEY = "authBackupOnUnload";

export const clearAuthStorage = () => {
  AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  sessionStorage.removeItem(AUTH_BACKUP_KEY);
};

export const restoreAuthFromSessionBackup = () => {
  try {
    const rawBackup = sessionStorage.getItem(AUTH_BACKUP_KEY);
    if (!rawBackup) return;

    const parsed = JSON.parse(rawBackup);
    AUTH_STORAGE_KEYS.forEach((key) => {
      if (parsed[key] !== undefined && parsed[key] !== null) {
        localStorage.setItem(key, String(parsed[key]));
      }
    });
  } catch (error) {
    console.error("Failed to restore auth backup:", error);
  } finally {
    sessionStorage.removeItem(AUTH_BACKUP_KEY);
  }
};

export const registerBrowserCloseAutoLogout = () => {
  const handleBeforeUnload = () => {
    const backup = AUTH_STORAGE_KEYS.reduce((acc, key) => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (Object.keys(backup).length > 0) {
      sessionStorage.setItem(AUTH_BACKUP_KEY, JSON.stringify(backup));
    }

    AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
};
