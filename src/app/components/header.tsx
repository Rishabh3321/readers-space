import { useState } from "react";
import Image from "next/image";
import HelpText from "./helpText";

export function Header() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
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
        <HelpText />
      </div>
    </div>
  );
}
