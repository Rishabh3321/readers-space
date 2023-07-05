"use client";

import { useState } from "react";
import { getDefinationAPI, getAutoCompleteAPI } from "./apis";
import Image from "next/image";
import HelpText from "./components/helpText";
import Suggestions from "./components/suggestions";
import Definations from "./components/definations";
import { Header } from "./components/header";

export type Defination = {
  type: string;
  shortdef: Array<string>;
};
export type DefinationArray = Array<Defination>;

export default function Home() {
  const [word, setWord] = useState<string>("");
  const [definations, setDefinations] = useState<DefinationArray>([]);
  const [suggest, setSuggest] = useState<Array<string>>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  async function fetchDefination(word: string) {
    let result = await getDefinationAPI(word);

    if (typeof result[0] == "string") {
      setSuggest(result);
      setDefinations([]);
      setIsEditing(true);
      return;
    }

    let definationsMap = new Map<string, Array<string>>();
    for (let i = 0; i < result.length; i++) {
      if (result[i].shortdef) {
        let previousShortdef = definationsMap.get(result[i].fl) || [];
        let defination: Defination = {
          type: result[i].fl,
          shortdef: [...previousShortdef, ...result[i].shortdef],
        };
        definationsMap.set(defination.type, defination.shortdef);
      }
    }

    let definations: DefinationArray = [];
    definationsMap.forEach((value, key) => {
      let defination: Defination = {
        type: key,
        shortdef: value,
      };
      definations.push(defination);
    });
    setSuggest([]);
    setDefinations(definations);
    setIsEditing(true);
  }

  return (
    <main>
      <div className="w-screen h-screen flex justify-center content-start flex-wrap">
        <Header />
        <form
          className="w-full flex justify-center content-center items-stretch"
          onSubmit={(e) => {
            e.preventDefault();
            fetchDefination(word);
          }}
        >
          <input
            className="block xs:w-5/6 md:w-1/3 h-8 text-black text-center rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            type="text"
            value={word}
            onChange={(e) => {
              if (e.target.value === "") {
                setDefinations([]);
              }
              setWord(e.target.value);
              setIsEditing(false);
            }}
          />
        </form>
        {word === "" ? (
          <></>
        ) : definations.length != 0 ? (
          <Definations definations={definations} />
        ) : isEditing && suggest.length === 0 ? (
          <Suggestions
            suggest={suggest}
            setValue={setWord}
            fetchDefination={fetchDefination}
          />
        ) : isEditing ? (
          <div className="mt-10 text-lg">Sorry, no word matches</div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
