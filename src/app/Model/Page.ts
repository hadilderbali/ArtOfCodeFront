import { JobApplication } from "./JobApplication";

// page.model.ts
export interface Page<T> {
  content:T[],
  pageable: {
    pageNumber: number,
    pageSize: number,
    sort: {
      empty:boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset:number,
    paged:boolean,
    unpaged: boolean
  },
  last: false,
  totalElements:number,
  totalPages: number,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: false,
    unsorted: boolean
  },
  first: boolean
  numberOfElements: number ,
  empty: false
}
  