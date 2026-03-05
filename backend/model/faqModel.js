import db from "../config/db.js";

const FAQ_CACHE_TTL_MS = 5 * 60 * 1000;

const faqCache = {
  value: null,
  expiresAt: 0,
};

const isFaqCacheValid = () => {
  return Array.isArray(faqCache.value) && Date.now() < faqCache.expiresAt;
};

// Fetch all FAQs
export const getAllFAQs = async () => {
  if (isFaqCacheValid()) {
    return faqCache.value;
  }

  const [rows] = await db.execute("SELECT id, question, answer, embedding FROM faqs");
  const normalizedRows = rows.map((f) => {
    let parsedEmbedding = null;

    if (Array.isArray(f.embedding)) {
      parsedEmbedding = f.embedding;
    } else if (typeof f.embedding === "string" && f.embedding.trim()) {
      try {
        const value = JSON.parse(f.embedding);
        parsedEmbedding = Array.isArray(value) ? value : null;
      } catch {
        parsedEmbedding = null;
      }
    }

    return {
      ...f,
      embedding: parsedEmbedding,
    };
  });

  faqCache.value = normalizedRows;
  faqCache.expiresAt = Date.now() + FAQ_CACHE_TTL_MS;

  return normalizedRows;
};

// Update embedding
export const updateFAQEmbedding = async (id, embedding) => {
  await db.execute(
    "UPDATE faqs SET embedding = ? WHERE id = ?",
    [JSON.stringify(embedding), id]
  );

  faqCache.value = null;
  faqCache.expiresAt = 0;
};
