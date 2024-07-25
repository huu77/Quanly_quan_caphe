import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_URL;

const TableApi = createApi({
  reducerPath: "TableApi",
  tagTypes: ['Table'], 
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
      invalidatesTags: ['Table'], 
    }),
    getAllTable: build.query({
      query: () => ({
        url: `/muiltiTable`,
        method: "GET",
      }),
      providesTags: ['Table'],
    }),
    putUpdateTable: build.mutation({
      query: (body) => ({
        url: `/updateTable`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ['Table'], 
    }),
  }),
});

export const { usePostTableMutation ,useGetAllTableQuery,usePutUpdateTableMutation } = TableApi;
export default TableApi;
