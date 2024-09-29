"use server";

import { CountryType } from "@/types/country";

export async function fetchCountry(): Promise<CountryType[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
}
