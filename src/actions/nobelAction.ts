"use server";

import { NobelProps } from "@/types/nobel";
import { ModelResponseType } from "@/types/response";

export async function fetchNobel(
  props: NobelProps,
): Promise<ModelResponseType> {
  let query = `page=${props.page}&page_size=${props.page_size}`;
  if (props.name_filter) {
    query += `&name_filter=${props.name_filter}`;
  }
  if (props.category_filter) {
    query += `&category_filter=${props.category_filter}`;
  }

  if (props.prize_year_start) {
    query += `&prize_year_start=${props.prize_year_start}`;
  }

  if (props.prize_year_end) {
    query += `&prize_year_end=${props.prize_year_end}`;
  }

  if (props.country_filter) {
    query += `&country_filter=${props.country_filter}`;
  }

  const response = await fetch(
    `https://toc-api.onionstreasure.com/nobel-prizes?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "no-difference",
      },
    },
  );
  const data = await response.json();
  return data;
}
