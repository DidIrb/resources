export const filterData = (
  query: string,
  selectedTags: string[],
  selectedTypes: string[],
  selectedTopics: string[]
): string => {
  const params = new URLSearchParams();

  if (query) params.append("query", query);
  if (selectedTags.length > 0) params.append("tags", selectedTags.join(","));
  if (selectedTypes.length > 0) params.append("types", selectedTypes.join(","));
  if (selectedTopics.length > 0) params.append("topics", selectedTopics.join(","));

  return params.toString();
};
