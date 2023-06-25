import { NextRequest, NextResponse } from "next/server";

const GetDefinationAPIUrl =
  "https://www.dictionaryapi.com/api/v3/references/collegiate/json";

export const getDefinationAPI = async (word: string) => {
  var url = `${GetDefinationAPIUrl}/${word}?key=${process.env.MERRIAM_API_KEY}`;
  const res = await fetch(url);
  return await res.json();
};

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.nextUrl);
  const word = url.searchParams.get("word");
  try {
    const data = await getDefinationAPI(word as string);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
