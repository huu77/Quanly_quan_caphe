import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../AxiosBaseQuery";
const API_URL = import.meta.env.VITE_APP_URL;

const ClientApi = createApi({
  reducerPath: "ClientApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: 600,
  endpoints: (build) => ({
 
    getAllClient: build.query({
      query: (isActive) => ({
        url: `/MuiltiProfile/${isActive}`,

        method: "GET"
      }),
    }),
  
  }),
});

export const {   } = ClientApi;
export default ClientApi;
