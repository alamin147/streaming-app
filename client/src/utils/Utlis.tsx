export const topRated = <T extends { ratings?: number }>(
  array: T[] | undefined
): T[] => {
  if (!array || array.length === 0) return [];
  const sortedArray = [...array];
  return sortedArray.sort((a, b) => {
    const ratingA = a.ratings ?? 0;
    const ratingB = b.ratings ?? 0;
    return ratingB - ratingA;
  });
};

export const recentVideos = <T extends { createdAt?: string }>(
  array: T[] | undefined
): T[] => {
  if (!array || array.length === 0) return [];

  const sortedArray = [...array];

  return sortedArray.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    return dateB - dateA;
  });
};
