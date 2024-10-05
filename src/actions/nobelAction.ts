import { NobelProps } from "@/types/nobel";
import { ModelResponseType } from "@/types/response";

export async function fetchNobel(
  props: NobelProps,
): Promise<ModelResponseType> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://toc-api.onionstreasure.com";
  const endpoint = "/nobel-prizes";

  const queryParams = new URLSearchParams({
    page: props.page.toString(),
    page_size: props.page_size.toString(),
    ...(props.name_filter && { name_filter: props.name_filter }),
    ...(props.category_filter && { category_filter: props.category_filter }),
    ...(props.prize_year_start && { prize_year_start: props.prize_year_start }),
    ...(props.prize_year_end && { prize_year_end: props.prize_year_end }),
    ...(props.country_filter && { country_filter: props.country_filter }),
    ...(props.motivation_filter && {
      motivation_filter: props.motivation_filter,
    }),
    ...(props.birth_year_start && {
      birth_year_start: props.birth_year_start,
    }),
    ...(props.birth_year_end && { birth_year_end: props.birth_year_end }),
  });

  try {
    const response = await fetch(`${baseUrl}${endpoint}?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ModelResponseType = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Nobel prizes:", error);
    throw error;
  }
}
