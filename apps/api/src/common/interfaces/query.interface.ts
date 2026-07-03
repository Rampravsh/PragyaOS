import { PaginationParams } from "./pagination.interface";

export interface QueryParams extends PaginationParams {
  search?: string;
  [key: string]: unknown;
}
