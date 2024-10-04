import { STATE_ENUM } from "@/enums/state.enum";
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
    <div className="flex justify-between items-center py-6 px-4 md:px-6">
      <div className="flex items-center ml-10 md:ml-0">
        <p className="font-semibold text-xl">{result} Result</p>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={() => hanldeChangeState(STATE_ENUM.CARD_STATE)}
          className={`p-2 rounded ${
            currentView === STATE_ENUM.CARD_STATE
              ? "bg-primary text-white"
              : "bg-white text-black"
          }`}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="8"
              y="8"
              width="9.6"
              height="9.6"
              stroke={currentView == STATE_ENUM.CARD_STATE ? "white" : "black"}
              strokeWidth="1.33333"
              strokeLinecap="round"
            />
            <rect
              x="8"
              y="22.4"
              width="9.6"
              height="9.6"
              stroke={currentView == STATE_ENUM.CARD_STATE ? "white" : "black"}
              strokeWidth="1.33333"
              strokeLinejoin="round"
            />
            <rect
              x="22.4"
              y="8"
              width="9.6"
              height="9.6"
              stroke={currentView == STATE_ENUM.CARD_STATE ? "white" : "black"}
              strokeWidth="1.33333"
              strokeLinejoin="round"
            />
            <rect
              x="22.4"
              y="22.4"
              width="9.6"
              height="9.6"
              stroke={currentView == STATE_ENUM.CARD_STATE ? "white" : "black"}
              strokeWidth="1.33333"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => hanldeChangeState(STATE_ENUM.TABLE_STATE)}
          className={`p-2 rounded ${
            currentView === STATE_ENUM.TABLE_STATE
              ? "bg-primary text-white"
              : "bg-white text-black"
          }`}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="8"
              y="8"
              width="9.93103"
              height="9.93103"
              stroke={currentView == STATE_ENUM.TABLE_STATE ? "white" : "black"}
              strokeWidth="1.24138"
              strokeLinejoin="round"
            />
            <rect
              x="8"
              y="22.069"
              width="9.93103"
              height="9.93103"
              stroke={currentView == STATE_ENUM.TABLE_STATE ? "white" : "black"}
              strokeWidth="1.24138"
              strokeLinejoin="round"
            />
            <path
              d="M22.069 9.65515H32"
              stroke={currentView == STATE_ENUM.TABLE_STATE ? "white" : "black"}
              strokeWidth="1.24138"
              strokeLinecap="round"
            />
            <path
              d="M22.069 15.4482H32"
              stroke={currentView == STATE_ENUM.TABLE_STATE ? "white" : "black"}
              strokeWidth="1.24138"
              strokeLinecap="round"
            />
            <path
              d="M22.069 23.7241H32"
              stroke={currentView == STATE_ENUM.TABLE_STATE ? "white" : "black"}
              strokeWidth="1.24138"
              strokeLinecap="round"
            />
            <path
              d="M22.069 29.5172H32"
              stroke={currentView == STATE_ENUM.TABLE_STATE ? "white" : "black"}
              strokeWidth="1.24138"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="bg-primary px-4 p-2.5 text-white rounded-lg font-medium">
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default Header;
