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
    postCreateAccount: build.mutation({
      query: (body) => ({
        url: `/createAccount`,
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const { usePostLoginMutation, useGetAllProfileQuery, usePostCreateAccountMutation } = AccountsApi;
export default AccountsApi;
