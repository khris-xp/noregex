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
import { SearchParamsProps } from "@/types/search";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  nobel: NobelType[];
  initialPage: number;
  pagination: PaginationType;
  searchParams: SearchParamsProps;
};

export default function HomeModules({
  nobel,
  pagination,
  searchParams,
}: Props) {
  const router = useRouter();
  const [viewState, setViewState] = useState(STATE_ENUM.CARD_STATE);
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    console.log("New Pages : ", newPage);
    const queryParams = new URLSearchParams({
      ...searchParams,
      page: newPage.toString(),
    });
    router.push(`/?${queryParams.toString()}`);
  };

  const renderContent = () => {
    if (nobel.length === 0) return <Empty />;
    return viewState === STATE_ENUM.TABLE_STATE ? (
      <Table data={nobel} columns={TABLE_HEADER} />
    ) : (
      <CardView data={nobel} />
    );
  };

  return (
    <div className="p-4 sm:ml-96 rounded-lg bg-background">
      <Header
        result={pagination.total_records}
        hanldeChangeState={setViewState}
        currentView={viewState}
      />

      <div className="flex items-center justify-center h-fit mb-4 rounded bg-gray-50">
        {renderContent()}
      </div>

      <div className="flex items-center justify-end rounded py-2">
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalItems={pagination.total_records}
          itemsPerPage={PAGE_ENUM.TABLE_ROW_PER_PAGE}
        />
      </div>
    </div>
  );
}
