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
    checkPhoneNumber: build.mutation({
      query: (body) => ({
        url: `/checkCustomerExists/${body}`,
        method: "GET",
      }),
    }),
    createCustomer: build.mutation({
      query: (body) => ({
        url: `/createCustomer`,
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetMenuQuery, useCheckPhoneNumberMutation, useCreateCustomerMutation } = ProductsApi;
export default ProductsApi;
