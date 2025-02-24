type ApiResponseGeneral = {
  items: [];
  limit: number;
  page: number;
  totalCount: number;
};

type ApiError = {
  data: unknown;
  http_status: string | number;
  handleError?: () => void;
};

type IPagination = {
  limit: number;
  page: number;
  total: number;
};

type IGenericData<T> = {
  data?: T | null;
  pagination?: IPagination;
  error?: unknown;
  status?: "idle" | "loading" | "success" | "failed";
};

type IParamsItem = {
  page: number;
  limit: number;
};

type ISearchParams = {
  keyword?: string;
};

type IDataResponseGeneral = {
  data: [] | any;
  pagination: any;
  status?: string | number;
  message?: string | any;
};

type ICreateUpdateResponse<T> = {
  data?: T | null;
  message?: string;
  status?: number;
  isError: boolean;
};
