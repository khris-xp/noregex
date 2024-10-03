"use client";
import CardView from "@/components/CardView";
import Empty from "@/components/Empty";
import Header from "@/components/Header";
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
  const [page, setPage] = useState<number>(1);
  return (
    <div className="p-4 sm:ml-96 border-2 border-gray-200 border-dashed rounded-lg bg-background">
      <Header
        result={props.pagination.total_records}
        hanldeChangeState={handleChangeState}
        currentView={viewState}
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

      <div className="flex items-center justify-end rounded py-2">
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalItems={props.pagination.total_pages}
          itemsPerPage={PAGE_ENUM.TABLE_ROW_PER_PAGE}
        />
      </div>
    </div>
  );
}
