import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_URL;

const AccountsApi = createApi({
  reducerPath: "AccountsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (body) => ({
        url: `/login`,

        method: "POST",
        data: body,
      }),
    }),
    getAllProfile: build.query({
      query: (isActive) => ({
        url: `/MuiltiProfile/${isActive}`,

        method: "GET"
      }),
    }),
  }),
});

export const { usePostLoginMutation,useGetAllProfileQuery } = AccountsApi;
export default AccountsApi;
