import React from "react";
import { NobelType } from "@/types/nobel";
import { useState, useEffect } from "react";

type HeaderProps = {
  result: NobelType[];
};

const Header: React.FC<HeaderProps> = ({ result }) => {
  const [viewState, setViewState] = useState(0);

  function clickCardView() {
    setViewState(0);
  }

  function clickTableView() {
    setViewState(1);
  }

  useEffect(() => {
    console.log("View state changed: ", viewState);
  }, [viewState]);

  return (
    <div className="mt-2 mb-3 grid grid-cols-3 gap-4">
      <div className="flex rounded bg-gray-50">
        <p className="font-bold">Result: {result.length}</p>
      </div>
      <div className="flex rounded "></div>
      <div className="grid grid-cols-3 rounded bg-gray-50 gap-4">
        <button
          onClick={clickCardView}
          className="bg-[#283584] text-white rounded"
        >
          Card
        </button>
        <button
          onClick={clickTableView}
          className="bg-[#283584] text-white rounded"
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
