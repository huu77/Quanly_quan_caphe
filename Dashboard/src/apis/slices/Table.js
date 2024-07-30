import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_URL;

const TableApi = createApi({
  reducerPath: "TableApi",
  tagTypes: ["Table", "StatusTable", "Status"],
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
      invalidatesTags: ["Table"],
    }),
    getAllTable: build.query({
      query: () => ({
        url: `/muiltiTable`,
        method: "GET",
      }),
      providesTags: ["Table"],
    }),
    putUpdateTable: build.mutation({
      query: (body) => ({
        url: `/updateTable`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["Table"],
    }),
    getsStatusTable: build.query({
      query: () => ({
        url: "/muiltiStatusTable",
        method: "GET",
      }),
      providesTags: ["StatusTable"],
    }),
    postStatusTable: build.mutation({
      query: (body) => ({
        url: `/createStatusTable`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["StatusTable"],
    }),
    putStatusTable: build.mutation({
      query: (body) => ({
        url: `/updateStatusTable`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["StatusTable"],
    }),
    getsStatus: build.query({
      query: () => ({
        url: `/muiltiStatus`,
        method: "get",
      }),
      providesTags: ["Status"],
    }),
    postStatus: build.mutation({
      query: (body) => ({
        url: `/createStatus`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Status"],
    }),

  }),
});

export const {
  usePostTableMutation,
  useGetAllTableQuery,
  usePutUpdateTableMutation,
  useGetsStatusTableQuery,
  usePostStatusTableMutation,
  usePutStatusTableMutation,
  useGetsStatusQuery,
  usePostStatusMutation,
} = TableApi;
export default TableApi;
