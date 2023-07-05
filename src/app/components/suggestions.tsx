function Suggestions({
  suggest,
  setValue,
  fetchDefination,
}: {
  suggest: string[];
  setValue: (word: string) => void;
  fetchDefination: (word: string) => Promise<void>;
}) {
  return (
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
  );
}

export default Suggestions;
