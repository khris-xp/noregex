"use client";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { NobelModel } from "@/constants/nobel.constant";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import CardView from "@/components/CardView";
const table_header = [
  "Image",
  "Name",
  "Category",
  "Year",
  "Birthdate",
  "Birthplace",
  "Quote",
];

export default function HomeModules() {
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
  const [page, setPage] = useState<number>(1);
  const TABLE_ROW_PER_PAGE = 6;
  const CARD_PER_PAGE = 8;
  return (
    <div className="p-4 sm:ml-96 border-2 border-gray-200 border-dashed rounded-lg bg-background">
      <Header
        result={NobelModel}
        clickCardHandler={clickCardView}
        clickTableHandler={clickTableView}
        currentView={viewState}
      />

      <div className="flex items-center justify-center h-fit mb-4 rounded bg-gray-50">
        {viewState == 1 ? (
          <Table
            data={NobelModel.slice(0, TABLE_ROW_PER_PAGE)}
            columns={table_header}
          />
        ) : (
          <CardView data={NobelModel.slice(0, CARD_PER_PAGE)} />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-center h-fit rounded bg-gray-50">
          <p className="text-2xl text-gray-400">
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-end rounded py-2">
          <Pagination
            page_amount={Math.ceil(NobelModel.length / TABLE_ROW_PER_PAGE)}
            setPage={() => setPage}
          />
        </div>
      </div>
    </div>
  );
}
