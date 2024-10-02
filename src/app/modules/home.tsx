"use client";
import CardView from "@/components/CardView";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { TABLE_HEADER } from "@/constants/table.cosntant";
import { PAGE_ENUM } from "@/enums/page.enum";
import { STATE_ENUM } from "@/enums/state.enum";
import { NobelType } from "@/types/nobel";
import { SetStateAction, useState } from "react";

type Props = {
  nobel: NobelType[];
};

export default function HomeModules(props: Props) {
  const [viewState, setViewState] = useState(STATE_ENUM.CARD_STATE);

  const handleChangeState = (state: SetStateAction<STATE_ENUM>) => {
    setViewState(state);
  };

  const [page, setPage] = useState<number>(1);
  return (
    <div className="p-4 sm:ml-96 border-2 border-gray-200 border-dashed rounded-lg bg-background">
      <Header
        result={props.nobel}
        hanldeChangeState={handleChangeState}
        currentView={viewState}
      />

      <div className="flex items-center justify-center h-fit mb-4 rounded bg-gray-50">
        {viewState === STATE_ENUM.TABLE_STATE ? (
          <Table
            data={props.nobel.slice(0, PAGE_ENUM.TABLE_ROW_PER_PAGE)}
            columns={TABLE_HEADER}
          />
        ) : (
          <CardView data={props.nobel.slice(0, PAGE_ENUM.CARD_PER_PAGE)} />
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
            page_amount={Math.ceil(
              props.nobel.length / PAGE_ENUM.TABLE_ROW_PER_PAGE,
            )}
            setPage={() => setPage}
          />
        </div>
      </div>
    </div>
  );
}
