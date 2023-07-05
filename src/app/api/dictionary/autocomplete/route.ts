/*
curl --location 'https://www.merriam-webster.com/lapi/v1/mwol-search/autocomplete?search=hello' \
--header 'Referer: https://www.merriam-webster.com/' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' \
--header 'Content-Type: application/json' \
--header 'Cookie: user-data=%7B%22is_logged_in%22%3Afalse%7D'

*/
import { NextRequest, NextResponse } from "next/server";

const GetAutocompleteAPIUrl =
  "https://www.merriam-webster.com/lapi/v1/mwol-search/autocomplete";

const getAutocompleteAPI = async (word: string) => {
  var url = `${GetAutocompleteAPIUrl}?search=${word}`;
  const res = await fetch(url, {
    headers: {
      Referer: "https://www.merriam-webster.com/",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/",
      "Content-Type": "application/json",
      Cookie: "user-data=%7B%22is_logged_in%22%3Afalse%7D",
    },
  });
  return await res.json();
};

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.nextUrl);
  const word = url.searchParams.get("word");
  try {
    const data = await getAutocompleteAPI(word as string);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
