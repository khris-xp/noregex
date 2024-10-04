import { fetchNobel } from "@/actions/nobelAction";
import { PAGE_ENUM } from "@/enums/page.enum";
import { NobelProps } from "@/types/nobel";
import { PaginationType } from "@/types/pagination";
import { SearchParamsProps } from "@/types/search";
import HomeModules from "./modules/home";

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams: SearchParamsProps;
}>) {
  const props: NobelProps = {
    page: searchParams.page || "1",
    page_size: PAGE_ENUM.CARD_PER_PAGE.toString(),
    country_filter: searchParams.country_filter || "",
    category_filter: searchParams.category_filter || "",
    name_filter: searchParams.name_filter || "",
    prize_year_start: searchParams.prize_year_start || "",
    prize_year_end: searchParams.prize_year_end || "",
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
