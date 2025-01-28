import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalBackend } from "../../utilities/Common";

export const ClinicApi = createApi({
  reducerPath: "ClinicApi",
  baseQuery: fetchBaseQuery({ baseUrl: LocalBackend() }),
  endpoints: (builder) => ({
    createNewClinic: builder.mutation({
      query: (data) => ({
        url: "/api/v1/createClinic",
        method: "POST",
        body: data,
      }),
    }),
    getAllClinic: builder.query({
      query: () => ({
        url: "/api/v1/getAllClinic",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateNewClinicMutation, useGetAllClinicQuery } = ClinicApi;
export default ClinicApi;
