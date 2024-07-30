import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_URL;

const SessionApi = createApi({
  reducerPath: "SessionApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    getAllNVToType: build.query({
      query: (queries) => ({
        url: `/getNvType?${queries || ""}`,
        method: "GET",
      }),
    }),
    postCreateSession: build.mutation({
      query: (body) => ({
        url: `/createSession`,
        method: "POST",
        data: body,
      }),
    }),
    getAllSession: build.query({
      query: () => ({
        url: `/muiltiSession`,
        method: "GET",
      }),
    }),
    postCreateSessionDetail: build.mutation({
      query: (body) => ({
        url: `/createSessionDetail`,
        method: "POST",
        data: body,
      }),
    }),
    getAllDetailSession: build.query({
      query: () => ({
        url: `/getAllDetailSession`,
        method: "GET",
      }),
    }),
    getAllNVtoSession: build.query({
      query: (id) => ({
        url: `/getAllNVtoSession/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllNVToTypeQuery,
  usePostCreateSessionMutation,
  useGetAllSessionQuery,
  usePostCreateSessionDetailMutation,
  useGetAllDetailSessionQuery,
  useGetAllNVtoSessionQuery
} = SessionApi;
export default SessionApi;
