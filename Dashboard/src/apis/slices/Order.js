import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_URL;

const OrderApi = createApi({
    reducerPath: "OrderApi",
    baseQuery: axiosBaseQuery({
        baseUrl: API_URL,
    }),
    keepUnusedDataFor: 600,
    endpoints: (build) => ({

        getAllOrder: build.query({
            query: () => ({
                url: `/muiltiOrder`,
                method: "GET"
            }),
        }),

    }),
});

export const {
    useGetAllOrderQuery
} = OrderApi;
export default OrderApi;
