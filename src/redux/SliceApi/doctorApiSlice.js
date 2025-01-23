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
    createDoctorSchedule: builder.mutation({
      query: (Data) => ({
        url: "/api/v1/postCreateDoctorSchedule",
        method: "POST",
        body: Data,
      }),
    }),
    getDoctorScheduleById: builder.query({
      query: ({ id, date }) => {
        return {
          url: `/api/v1/getDoctorScheduleById?id=${id}&date=${date}`,
          method: "GET",
        };
      },
    }),
    createTableDoctorInfo: builder.mutation({
      query: (data) => ({
        url: "/api/v1/addTableDoctorInfo",
        method: "POST",
        body: data,
      }),
    }),
    getTableDoctorInforById: builder.query({
      query: (id) => {
        return {
          url: `/api/v1/getTableDoctorInfor?id=${id}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  useGetTopDoctorQuery,
  useGetAllDoctorQuery,
  useGetDoctorByIdQuery,
  useGetDoctorScheduleByIdQuery,
  useGetTableDoctorInforByIdQuery,
  useCreateDoctorMutation,
  useCreateTableDoctorInfoMutation,
  useCreateDoctorScheduleMutation,
} = DoctorApi;
export default DoctorApi;
