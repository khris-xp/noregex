"use server";

import { ModelResponseType } from "@/types/response";

export type NobelProps = {
  page: string;
  page_size: string;
  name_filter?: string;
  category_filter?: string;
  prize_year?: string;
};

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

  if (props.prize_year) {
    query += `&prize_year=${props.prize_year}`;
  }
  const response = await fetch(
    `https://toc-api.onionstreasure.com/nobel-prizes?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.json();
}
