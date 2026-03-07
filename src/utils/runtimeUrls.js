const ensureProtocol = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const configuredApiUrl =
  process.env.REACT_APP_API_URL || process.env.REACT_APP_API || "";

const browserOrigin =
  typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : "";

export const API_BASE_URL = (ensureProtocol(configuredApiUrl) || `${browserOrigin}/api`).replace(
  /\/+$/,
  "",
);

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/i, "");

export const SOCKET_URL = (
  ensureProtocol(process.env.REACT_APP_SOCKET_URL || "") || API_ORIGIN
).replace(/\/+$/, "");

export const buildMediaUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = API_ORIGIN ? `${API_ORIGIN}${normalizedPath}` : normalizedPath;

  // Pet images are protected and must include token for browser-initiated image requests.
  if (/\/api\/pets\/images\//i.test(normalizedPath) && typeof window !== "undefined") {
    const token = window.localStorage?.getItem("token");
    if (token) {
      const separator = baseUrl.includes("?") ? "&" : "?";
      return `${baseUrl}${separator}token=${encodeURIComponent(token)}`;
    }
  }

  return baseUrl;
};
