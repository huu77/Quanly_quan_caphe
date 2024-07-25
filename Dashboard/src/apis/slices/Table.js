import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_URL;

const TableApi = createApi({
  reducerPath: "TableApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    postTable: build.mutation({
      query: (body) => ({
        url: `/createTable`,

        method: "POST",
        data: body,
      }),
    }),
    getAllTable: build.query({
      query: () => ({
        url: `/muiltiTable`,
        method: "GET",
      }),
    }),
  }),
});

export const { usePostTableMutation ,useGetAllTableQuery} = TableApi;
export default TableApi;
