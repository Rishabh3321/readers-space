export const getDefinationAPI = async (word: string) => {
  const res = await fetch("/api/dictionary?word=" + word);
  return await res.json();
};
