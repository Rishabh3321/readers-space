export const getDefinationAPI = async (word: string) => {
  const res = await fetch("/api/dictionary?word=" + word);
  return await res.json();
};

export const getAutoCompleteAPI = async (word: string) => {
  const res = await fetch("/api/dictionary/autocomplete?word=" + word);
  return await res.json();
};
