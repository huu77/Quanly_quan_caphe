// apis/slices/Category.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_URL;

const CategoryApi = createApi({
    reducerPath: "CategoryApi",
    baseQuery: axiosBaseQuery({
        baseUrl: API_URL,
    }),
    keepUnusedDataFor: 600,
    endpoints: (build) => ({
        GetAllCategory: build.query({
            query: () => ({ url: '/muiltiCategory', method: 'GET' }),
        }),
        GetOneCategory: build.query({
            query: (Categoryid) => ({
                url: `/oneCategory/${Categoryid}`,
                method: "get",

            }),
        }),
        updateCategory: build.mutation({
            query: (body) => ({
                url: `/updateCategory`,
                method: "PUT",
                data: body,
            }),
        }),
        createCategory: build.mutation({
            query: (body) => ({
                url: `/createCategory`,
                method: "POST",
                data: body,
            }),
        }),
        DeleteCategory: build.mutation({
            query: (Categoryid) => ({
                url: `/deleteCategory/${Categoryid}`,
                method: "DELETE",

            }),
        }),
    }),
});

export const { useGetAllCategoryQuery, useGetOneCategoryQuery, useDeleteCategoryMutation, useUpdateCategoryMutation, useCreateCategoryMutation } = CategoryApi;
export default CategoryApi;
