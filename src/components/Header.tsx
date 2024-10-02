import { STATE_ENUM } from "@/enums/state.enum";
import { NobelType } from "@/types/nobel";
import React, { SetStateAction } from "react";

type HeaderProps = {
  result: number;
  hanldeChangeState: (state: SetStateAction<STATE_ENUM>) => void;
  currentView: STATE_ENUM;
};

const Header: React.FC<HeaderProps> = ({
  result,
  hanldeChangeState,
  currentView,
}) => {
  return (
    <div className="p-6 py-10">
      <div className="flex justify-between">
        <div className="rounded bg-gray-50">
          <p className="font-bold text-xl">{result} Result</p>
        </div>
        <div className="rounded bg-gray-50 gap-4">
          <button
            onClick={() => hanldeChangeState(STATE_ENUM.CARD_STATE)}
            className={
              currentView == STATE_ENUM.CARD_STATE
                ? "bg-[#283584] text-white rounded hover:cursor-pointer px-10"
                : "bg-white text-black rounded hover:cursor-pointer px-10"
            }
          >
            Card
          </button>
          <button
            onClick={() => hanldeChangeState(STATE_ENUM.TABLE_STATE)}
            className={
              currentView == STATE_ENUM.TABLE_STATE
                ? "bg-[#283584] text-white rounded hover:cursor-pointer px-10"
                : "bg-white text-black rounded hover:cursor-pointer px-10"
            }
          >
            Table
          </button>
          <button className="bg-[#283584] text-white rounded">
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
