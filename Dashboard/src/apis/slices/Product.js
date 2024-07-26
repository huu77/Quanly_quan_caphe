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
    postLogin: build.mutation({
      query: (body) => ({
        url: `/v2/Agencies/sign-in`,
        method: "POST",
        data: body,
      }),
    }),
    createProduct: build.mutation({
      query: (body) => ({
        url: `/createProduct`,
        method: "POST",
        data: body,
      }),
    }),
    updateProduct: build.mutation({
      query: (body) => ({
        url: `/updateProduct`,
        method: "PUT",
        data: body,
      }),
    }),
    GetALLProduct: build.query({
      query: () => ({
        url: `/muiltiProduct`,
        method: "GET",

      }),
    }),
    DeleteProduct: build.mutation({
      query: (Productid) => ({
        url: `/deleteProduct/${Productid}`,
        method: "DELETE",

      }),
    }),
    GetOneProduct: build.query({
      query: (Productid) => ({
        url: `/oneProduct/${Productid}`,
        method: "get",

      }),
    }),
  }),
});

export const {
  usePostLoginMutation,
  useCreateProductMutation,
  useGetALLProductQuery,
  useDeleteProductMutation,
  useGetOneProductQuery,
  useUpdateProductMutation
} = ProductsApi;
export default ProductsApi;
