const GetDefinationAPIUrl =
  "https://www.dictionaryapi.com/api/v3/references/collegiate/json";

export const getDefinationAPI = (word: string) => {
  var url = `${GetDefinationAPIUrl}/${word}?key=${process.env.NEXT_PUBLIC_MERRIAM_API_KEY}`;
  return fetch(url, {
    method: "GET",
    headers: {},
  }).then((res) => res.json());
};
