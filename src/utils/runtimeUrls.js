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

const normalizeOrigin = (url) => ensureProtocol(url).replace(/\/+$/, "").toLowerCase();

export const API_BASE_URL = (ensureProtocol(configuredApiUrl) || `${browserOrigin}/api`).replace(
  /\/+$/,
  "",
);

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/i, "");

const configuredSocketUrl = ensureProtocol(process.env.REACT_APP_SOCKET_URL || "").replace(
  /\/+$/,
  "",
);

const shouldUseApiOriginForSocket =
  configuredSocketUrl &&
  normalizeOrigin(configuredSocketUrl) === normalizeOrigin(browserOrigin) &&
  normalizeOrigin(API_ORIGIN) !== normalizeOrigin(browserOrigin);

export const SOCKET_URL = (
  (shouldUseApiOriginForSocket ? API_ORIGIN : configuredSocketUrl) || API_ORIGIN
).replace(/\/+$/, "");

export const buildMediaUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return API_ORIGIN ? `${API_ORIGIN}${normalizedPath}` : normalizedPath;
};
