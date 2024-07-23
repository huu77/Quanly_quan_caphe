import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_ROOM_URL;

const ProductsApi = createApi({
  reducerPath: "ProductsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (body) => ({
        url: `/v2/Agencies/sign-in`,

        method: "POST",
        data: body,
      }),
    }),
  
  }),
});

export const { usePostLoginMutation } = ProductsApi;
export default ProductsApi;
