import { fetchNobel, NobelProps } from "@/actions/nobelAction";
import { PAGE_ENUM } from "@/enums/page.enum";
import { PaginationType } from "@/types/pagination";
import HomeModules from "./modules/home";

export type SearchParamsProps = {
  page?: string;
  category_filter?: string;
  name_filter?: string;
  prize_year?: string;
};

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams: SearchParamsProps;
}>) {
  const props: NobelProps = {
    page: searchParams.page || "1",
    page_size: PAGE_ENUM.CARD_PER_PAGE.toString(),
    category_filter: searchParams.category_filter || "",
    name_filter: searchParams.name_filter || "",
    prize_year: searchParams.prize_year || "",
  };

  const nobel = await fetchNobel(props);
  const initialPage = parseInt(searchParams.page || "1", 10);
  const pagination: PaginationType = nobel.pagination;

  return (
    <HomeModules
      nobel={nobel.data}
      initialPage={initialPage}
      pagination={pagination}
      searchParams={searchParams}
    />
  );
}
