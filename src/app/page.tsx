"use client";

import { useState } from "react";
import { getDefinationAPI } from "./apis";

type Defination = {
  type: string;
  shortdef: Array<string>;
};
type DefinationArray = Array<Defination>;

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [definations, setDefinations] = useState<DefinationArray>([]);
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
    console.log(result);

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
    setDefinations(definations);
  }

  return (
    <main>
      <div className="w-screen h-screen flex justify-center content-start flex-wrap">
        <div className="w-full h-1/3" />
        <input
          className="inline-block w-1/3 h-8 text-black text-center rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          type="text"
          value={value}
          onChange={(e) => {
            if (e.target.value === "") {
              setDefinations([]);
            }
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              fetchDefination(value);
            }
          }}
        />
        <div className="w-full mt-10 pb-20 text-justify flex content-center justify-center">
          <div className="w-1/3">
            {definations.map((defination, index) => {
              return (
                <div>
                  <div className={`text-2xl ${getUniqueColor(index)}`}>
                    {defination.type}
                  </div>
                  <ul className="list-disc list-inside">
                    {defination.shortdef.map((def) => {
                      return <li>{def}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
