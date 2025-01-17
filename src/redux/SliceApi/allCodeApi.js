import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AllCodeApi = createApi({
  reducerPath: "AllCodeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    getAllCodeTime: builder.query({
      query: (style) => ({
        url: `api/v1/get-allCode?type=${style}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllCodeTimeQuery } = AllCodeApi;
export default AllCodeApi;
