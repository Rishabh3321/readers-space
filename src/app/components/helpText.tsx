import Image from "next/image";

function HelpText() {
  return (
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
          Readers space is a minimalistic dictionary app. Just type the word and
          press enter to get the defination. I just built this app as a hobby
          project. Powered by Merriam-Webster.
        </span>
      </div>
    </div>
  );
}

export default HelpText;
