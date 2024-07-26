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
        url: `/getNvType?${queries || ''}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllNVToTypeQuery } = SessionApi;
export default SessionApi;
