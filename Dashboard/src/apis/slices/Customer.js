import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_URL;

const CustomerApi = createApi({
    reducerPath: "CustomerApi",
    baseQuery: axiosBaseQuery({
        baseUrl: API_URL,
    }),
    keepUnusedDataFor: 600,
    endpoints: (build) => ({

        getAllCustomer: build.query({
            query: () => ({
                url: `/muiltiCustomer`,
                method: "GET"
            }),
        }),

    }),
});

export const {
    useGetAllCustomerQuery
} = CustomerApi;
export default CustomerApi;
