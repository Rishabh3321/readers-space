"use client";

import { useState } from "react";
import { getDefinationAPI, getAutoCompleteAPI } from "./apis";
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
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

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

  async function fetchAutoComplete(word: string) {
    let result = await getAutoCompleteAPI(word);
    result = result.docs;

    let suggestionMap = new Set<string>();
    for (let i = 0; i < result.length; i++) {
      suggestionMap.add(result[i].word);
    }

    let suggestions: Array<string> = [];
    suggestionMap.forEach((value) => {
      suggestions.push(value);
    });
    setSuggest(suggestions);
  }

  return (
    <main>
      <div className="w-screen h-screen flex justify-center content-start flex-wrap">
        <Header />
        <div className="xs:w-5/6 md:w-1/3">
          <form
            className="w-full flex justify-center content-center items-stretch flex-wrap"
            onSubmit={(e) => {
              e.preventDefault();
              fetchDefination(word);
            }}
          >
            <input
              className="block w-full h-8 text-black text-center rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              type="text"
              value={word}
              onChange={(e) => {
                if (e.target.value === "") {
                  setDefinations([]);
                }
                setWord(e.target.value);
                fetchAutoComplete(e.target.value);
                setIsEditing(false);
                setActiveSuggestion(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  if (activeSuggestion === 0) {
                    setActiveSuggestion(suggest.length - 1);
                    return;
                  }
                  setActiveSuggestion(activeSuggestion - 1);
                }
                if (e.key === "ArrowDown") {
                  if (activeSuggestion === suggest.length - 1) {
                    setActiveSuggestion(0);
                    return;
                  }
                  setActiveSuggestion(activeSuggestion + 1);
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  let serachWord = suggest[activeSuggestion] || word;
                  setWord(serachWord);
                  fetchDefination(serachWord);
                }
              }}
            />
            <div className="w-full">
              <ul className="max-h-56 overflow-y-auto ">
                {suggest.map((word, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        `text-lg cursor-pointer  border-gray-200 border-2 hover:border-blue-400 ` +
                        (index === activeSuggestion
                          ? "bg-blue-400 text-white"
                          : "bg-gray-200 text-black ")
                      }
                      onClick={() => {
                        setWord(word);
                        fetchDefination(word);
                      }}
                    >
                      {word}
                    </li>
                  );
                })}
              </ul>
            </div>
          </form>

          {word === "" ? (
            <></>
          ) : definations.length != 0 ? (
            <Definations definations={definations} />
          ) : isEditing ? (
            <div className="mt-10 text-lg">Sorry, no word matches</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}
