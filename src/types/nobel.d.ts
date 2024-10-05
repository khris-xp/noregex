export type NobelType = {
  year: number;
  category: string;
  name: string;
  born_date: string;
  born_place: string;
  image: string;
  motivation: string;
};

export type NobelProps = {
  page: string;
  page_size: string;
  name_filter?: string;
  category_filter?: string;
  prize_year_start?: string;
  prize_year_end?: string;
  country_filter?: string;
  motivation_filter?: string;
  birth_year_start?: string;
  birth_year_end?: string;
};
