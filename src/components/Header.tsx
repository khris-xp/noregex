"use client";

import { fetchNobel } from "@/actions/nobelAction";
import { STATE_ENUM } from "@/enums/state.enum";
import { NobelProps, NobelType } from "@/types/nobel";
import { SearchParamsProps } from "@/types/search";
import React, { SetStateAction, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

type HeaderProps = {
  result: number;
  hanldeChangeState: (state: SetStateAction<STATE_ENUM>) => void;
  currentView: STATE_ENUM;
  searchParams: SearchParamsProps;
};

export default function Header({
  result,
  hanldeChangeState,
  currentView,
  searchParams,
}: HeaderProps) {
  const [csvData, setCsvData] = useState<NobelType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const props: NobelProps = {
        page: "1",
        page_size: "1000",
        category_filter: searchParams.category_filter || "",
        name_filter: searchParams.name_filter || "",
        prize_year_start: searchParams.prize_year_start || "",
        prize_year_end: searchParams.prize_year_end || "",
        country_filter: searchParams.country_filter || "",
        motivation_filter: searchParams.motivation_filter || "",
        birth_year_start: searchParams.birth_year_start || "",
        birth_year_end: searchParams.birth_year_end || "",
      };
      const nobel = await fetchNobel(props);
      setCsvData(nobel.data);
    };

    fetchData();
  }, [searchParams]);

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
        <CSVLink
          data={csvData}
          filename="nobel_prizes.csv"
          className="bg-primary px-4 py-2 text-white rounded-lg font-medium"
        >
          Download CSV
        </CSVLink>
      </div>
    </div>
  );
}
