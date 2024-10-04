"use client"
// sorry for doing this, it will be modified later

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { TABLE_HEADER } from "@/constants/table.cosntant";
import { PAGE_ENUM } from "@/enums/page.enum";
import { STATE_ENUM } from "@/enums/state.enum";
import { NobelType } from "@/types/nobel";
import { PaginationType } from "@/types/pagination";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { SearchParamsProps } from "../page";
import { fetchNobel, NobelProps } from "@/actions/nobelAction";

type Props = {
  nobel: NobelType[];
  initialPage: number;
  pagination: PaginationType;
  searchParams: SearchParamsProps;
};

export default function HomeModules(props: Props) {
  const router = useRouter();
  const [viewState, setViewState] = useState(STATE_ENUM.CARD_STATE);

  const handleChangeState = (state: SetStateAction<STATE_ENUM>) => {
    setViewState(state);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const { category_filter, name_filter, prize_year } = props.searchParams;

    const queryParams = new URLSearchParams();

    if (category_filter) queryParams.append("category_filter", category_filter);
    if (name_filter) queryParams.append("name_filter", name_filter);
    if (prize_year) queryParams.append("prize_year", prize_year);

    queryParams.append("page", newPage.toString());

    router.push(`/?${queryParams.toString()}`);
  };

  const fetchData = async (): Promise<NobelType[]> => {
    const { category_filter, name_filter, prize_year } = props.searchParams;

    const queryParams = new URLSearchParams();

    if (category_filter) queryParams.append("category_filter", category_filter);
    if (name_filter) queryParams.append("name_filter", name_filter);
    if (prize_year) queryParams.append("prize_year", prize_year);
    queryParams.append("page", "1");
    queryParams.append("page_size", "5000");

    const params: NobelProps = {
      page: "1",
      page_size: "5000",
      category_filter: category_filter || "",
      name_filter: name_filter || "",
      prize_year: prize_year || "",
    };
    const nobelResponse = (await fetchNobel(params)) as unknown;
    const nobel = (nobelResponse as { results: NobelType[] }).results;
    return nobel;
  };

  const [page, setPage] = useState<number>(1);
  const [csvData, setCsvData] = useState<NobelType[]>([]);
  return (
    <div className="p-4 sm:ml-96 border-2 border-gray-200 border-dashed rounded-lg bg-background">
      <Header
        result={props.pagination.total_records}
        hanldeChangeState={handleChangeState}
        currentView={viewState}
        columns={TABLE_HEADER}
        fetchData={fetchData}
      />

      <div className="flex items-center justify-center h-fit mb-4 rounded bg-gray-50">
        {props.nobel.length === 0 ? (
          <Empty />
        ) : viewState === STATE_ENUM.TABLE_STATE ? (
          <Table data={props.nobel} columns={TABLE_HEADER} />
        ) : (
          <CardView data={props.nobel} />
        )}
      </div>

      {/* janipang working on this */}
      <div className="flex items-center justify-center h-fit mb-4 rounded bg-gray-50">
        <Table data={NobelModel.slice(0, 7)} columns={table_header} />
      </div>
      {/* end of janipang working on this */}

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
          <Pagination page_amount={Math.ceil(NobelModel.length / ROW_PER_PAGE)} setPage={() => setPage}/>
        </div>
      </div>
    </div>
  );
}
