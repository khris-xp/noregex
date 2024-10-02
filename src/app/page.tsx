import { fetchNobel } from "@/actions/nobelAction";
import { PAGE_ENUM } from "@/enums/page.enum";
import { PaginationType } from "@/types/pagination";
import HomeModules from "./modules/home";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const props = {
    page: searchParams.page || "1",
    page_size: PAGE_ENUM.CARD_PER_PAGE.toString(),
  };

  const nobel = await fetchNobel(props);
  const initialPage = parseInt(searchParams.page || "1", 10);
  const pagination: PaginationType = nobel.pagination;

  return (
    <HomeModules
      nobel={nobel.data}
      initialPage={initialPage}
      pagination={pagination}
    />
  );
}
