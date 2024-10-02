import { NobelType } from "./nobel";
import { PaginationType } from "./pagination";

export type ModelResponseType = {
  data: NobelType[];
  pagination: PaginationType;
};
