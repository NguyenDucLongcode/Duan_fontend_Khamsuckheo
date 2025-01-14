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
  }),
});
export const { useGetTopDoctorQuery } = DoctorApi;
export default DoctorApi;
