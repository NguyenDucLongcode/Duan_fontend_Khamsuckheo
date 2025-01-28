import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalBackend } from "../../utilities/Common";

export const SpecialistApi = createApi({
  reducerPath: "SpecialistApi",
  baseQuery: fetchBaseQuery({ baseUrl: LocalBackend() }),
  endpoints: (builder) => ({
    createNewSpecialist: builder.mutation({
      query: (data) => ({
        url: "api/v1/createNewSpecialist",
        method: "POST",
        body: data,
      }),
    }),
    getAllSpecialist: builder.query({
      query: () => ({
        url: "api/v1/getAllSpecialists",
        method: "GET",
      }),
    }),
    getDoctorByIdSpecialist: builder.query({
      query: ({ id, type }) => ({
        url: `/api/v1/getDoctorByIdSpecialist?id=${id}&type=${type}`,
        method: "GET",
      }),
    }),
    getSpecialistsById: builder.query({
      query: (id) => ({
        url: `/api/v1/getSpecialistsById?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateNewSpecialistMutation,
  useGetAllSpecialistQuery,
  useGetDoctorByIdSpecialistQuery,
  useGetSpecialistsByIdQuery,
} = SpecialistApi;
export default SpecialistApi;
