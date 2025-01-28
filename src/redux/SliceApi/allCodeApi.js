import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalBackend } from "../../utilities/Common";
export const AllCodeApi = createApi({
  reducerPath: "AllCodeApi",
  baseQuery: fetchBaseQuery({ baseUrl: LocalBackend() }),
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
