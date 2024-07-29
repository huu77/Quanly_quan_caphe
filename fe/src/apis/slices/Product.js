import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../AxiosBaseQuery";

const API_URL = import.meta.env.VITE_APP_URL;

const ProductsApi = createApi({
  reducerPath: "ProductsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
    getMenu: build.query({
      query: () => ({
        url: `/muiltiCategory`, // Updated URL to match the new API endpoint
        method: "GET",
      }),
    }),
    getProducts: build.query({
      query: () => ({
        url: `/muiltiProduct`,
        method: "GET",
      }),
    }),
    postLogin: build.mutation({
      query: (body) => ({
        url: `/v2/Agencies/sign-in`,
        method: "POST",
        data: body,
      }),
    }),
    
  }),
});

export const { useGetProductsQuery, usePostLoginMutation, useGetMenuQuery } = ProductsApi;
export default ProductsApi;
