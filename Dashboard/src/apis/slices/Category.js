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
    }),
});

export const { useGetAllCategoryQuery } = CategoryApi;
export default CategoryApi;
