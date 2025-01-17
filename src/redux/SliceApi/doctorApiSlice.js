import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DoctorApi = createApi({
  reducerPath: "DoctorsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    getTopDoctor: builder.query({
      query: (limit) => ({
        url: `api/v1/get-topDoctor?limit=${limit}`,
        method: "GET",
      }),
    }),
    getAllDoctor: builder.query({
      query: () => ({
        url: "api/v1/getAllDoctor",
        method: "GET",
      }),
    }),
    getDoctorById: builder.query({
      query: (doctorId) => ({
        url: `api/v1/getDoctorById?id=${doctorId}`,
        method: "GET",
      }),
    }),
    createDoctor: builder.mutation({
      query: (Data) => ({
        url: "api/v1/addInforDoctor",
        method: "POST",
        body: Data,
      }),
    }),
  }),
});
export const {
  useGetTopDoctorQuery,
  useGetAllDoctorQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
} = DoctorApi;
export default DoctorApi;
