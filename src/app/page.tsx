"use client";

import { useState } from "react";
import { getDefinationAPI } from "./apis";
import Image from "next/image";

type Defination = {
  type: string;
  shortdef: Array<string>;
};
type DefinationArray = Array<Defination>;

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [definations, setDefinations] = useState<DefinationArray>([]);
  const [suggest, setSuggest] = useState<Array<string>>([]);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  function getUniqueColor(index: number) {
    const colors = [
      "text-red-500",
      "text-yellow-500",
      "text-green-500",
      "text-blue-500",
      "text-indigo-500",
      "text-purple-500",
      "text-pink-500",
    ];
    return colors[index % colors.length];
  }

  async function fetchDefination(word: string) {
    let result = await getDefinationAPI(word);

    if (typeof result[0] == "string") {
      setSuggest(result);
      setDefinations([]);
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
  }

  return (
    <main>
      <div className="w-screen h-screen flex justify-center content-start flex-wrap">
        <div className="w-full h-1/3">
          <div className="w-full flex justify-end">
            {isFullScreen ? (
              <Image
                src="fullscreen_exit.svg"
                alt="fullscreen"
                width="30"
                height="30"
                className="cursor-pointer bg-white p-1 mx-1 my-2 rounded-sm"
                onClick={(e) => {
                  e.preventDefault();
                  document.exitFullscreen();
                  setIsFullScreen(false);
                }}
              />
            ) : (
              <Image
                src="fullscreen.svg"
                alt="fullscreen"
                width="30"
                height="30"
                className="cursor-pointer bg-white p-1 mx-1 my-2 rounded-sm"
                onClick={(e) => {
                  e.preventDefault();
                  document.documentElement.requestFullscreen();
                  setIsFullScreen(true);
                }}
              />
            )}
            <div className="relative flex flex-col items-center group">
              <Image
                src="help.svg"
                alt="help"
                width="30"
                height="30"
                className="cursor-pointer bg-white p-1 mx-1 my-2 rounded-sm"
              />
              <div className="absolute top-12 right-3 flex-col items-end hidden group-hover:flex">
                <div className="w-3 h-3 mb-[-0.4rem] mr-[0.11rem] rotate-45 bg-white"></div>
                <span className="relative w-32 z-10 p-2 text-xs leading-none text-black whitespace-break-spaces bg-white shadow-lg">
                  Readers space is a minimalistic dictionary app. Just type the
                  word and press enter to get the defination. I just built this
                  app as a hobby project. Powered by Merriam-Webster.
                </span>
              </div>
            </div>
          </div>
        </div>
        <form
          className="w-full flex justify-center content-center items-stretch"
          onSubmit={(e) => {
            e.preventDefault();
            fetchDefination(value);
          }}
        >
          <input
            className="block xs:w-5/6 md:w-1/3 h-8 text-black text-center rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            type="text"
            value={value}
            onChange={(e) => {
              if (e.target.value === "") {
                setDefinations([]);
              }
              setValue(e.target.value);
            }}
          />
        </form>
        {definations.length != 0 ? (
          <div className="w-full mt-10 pb-20 text-justify flex content-center justify-center">
            <div className="xs:w-5/6 md:w-1/3">
              {definations.map((defination, index) => {
                return (
                  <div key={index}>
                    <div className={`text-2xl ${getUniqueColor(index)}`}>
                      {defination.type}
                    </div>
                    <ul className="list-disc list-inside">
                      {defination.shortdef.map((def, index) => {
                        return <li key={index}>{def}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <> </>
        )}

        {suggest.length ? (
          <div className="w-full mt-10 pb-20 text-justify flex content-center justify-center flex-wrap">
            <div className="w-1/3">
              <p className="inline-block text-2xl mb-3">Suggestions</p>
              <ul className="w-full pl-4 list-disc list-inside ">
                {suggest.map((word, index) => {
                  return (
                    <li
                      key={index}
                      className="text-lg text-blue-500 cursor-pointer"
                      onClick={() => {
                        setValue(word);
                        fetchDefination(word);
                      }}
                    >
                      {word}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
