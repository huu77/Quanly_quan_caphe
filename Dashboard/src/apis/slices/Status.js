import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_URL;

const StatusApi = createApi({
  reducerPath: "StatusApi",tagTypes: ['StatusTable'], 
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    getsStatusTable: build.query({
      query: () => ({
        url: '/muiltiStatusTable',
        method: 'GET',
      }),
      providesTags: ['StatusTable'],
    }),
    postStatusTable: build.mutation({
      query: (body) => ({
        url: `/createStatusTable`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: ['StatusTable'], 
    }),
    getsStatus: build.query({
      query: () => ({
        url: `/muiltiStatus`,
        method: "get",
      }),
      providesTags: ['StatusTable'],
    }),
    postStatus: build.mutation({
      query: (body) => ({
        url: `/createStatus`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: ['StatusTable'], 
    }),
  }),
});

export const { } = StatusApi;
export default StatusApi;
