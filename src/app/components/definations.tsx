import { DefinationArray } from "../page";
import { GetUniqueColor } from "../utils";

function Definations({ definations }: { definations: DefinationArray }) {
  return (
    <div className="w-full mt-10 pb-20 text-justify flex content-center justify-center">
      <div className="w-full">
        {definations.map((defination, index) => {
          return (
            <div key={index}>
              <div className={`text-2xl ${GetUniqueColor(index)}`}>
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
  );
}

export default Definations;
