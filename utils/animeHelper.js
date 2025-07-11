// Deduplicates based on mal_id
export function mergeAndDeduplicate(...lists) {
  const seen = new Set();
  const merged = [];

  lists.flat().forEach((anime) => {
    if (!seen.has(anime.mal_id)) {
      seen.add(anime.mal_id);
      merged.push(anime);
    }
  });

  return merged;
}
