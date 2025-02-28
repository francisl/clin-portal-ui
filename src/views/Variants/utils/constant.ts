import { IQueryConfig } from "utils/searchPageTypes";

export const VARIANT_QB_ID = 'patient-variant-repo';

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 20;

export const SCROLL_WRAPPER_ID = 'variant-scroll-wrapper';

export const DEFAULT_PAGING_CONFIG = {
  index: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
};

export const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
  sort: [],
};
