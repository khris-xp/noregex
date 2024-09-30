import React from "react";
import { NobelType } from "@/types/nobel";

type HeaderProps = {
  result: NobelType[];
  clickTableHandler: any;
  clickCardHandler: any;
  currentView: number;
};

const Header: React.FC<HeaderProps> = ({
  result,
  clickTableHandler,
  clickCardHandler,
  currentView,
}) => {
  return (
    <div className="mt-2 mb-3 grid grid-cols-3 gap-4">
      <div className="flex rounded bg-gray-50">
        <p className="font-bold">Result: {result.length}</p>
      </div>
      <div className="flex rounded "></div>
      <div className="grid grid-cols-3 rounded bg-gray-50 gap-4">
        <button
          onClick={clickCardHandler}
          className={
            currentView == 0
              ? "bg-[#283584] text-white rounded hover:cursor-pointer"
              : "bg-white text-black rounded hover:cursor-pointer"
          }
        >
          Card
        </button>
        <button
          onClick={clickTableHandler}
          className={
            currentView == 1
              ? "bg-[#283584] text-white rounded hover:cursor-pointer"
              : "bg-white text-black rounded hover:cursor-pointer"
          }
        >
          Table
        </button>
        <button className="bg-[#283584] text-white rounded">
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default Header;
