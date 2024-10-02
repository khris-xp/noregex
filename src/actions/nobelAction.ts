"use server";

import { NobelType } from "@/types/nobel";

export async function fetchNobel(): Promise<NobelType[]> {
  const response = await fetch(
    " https://toc-api.onionstreasure.com/nobel-prizes",
  );
  return response.json();
}
