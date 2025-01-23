import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PatientApi = createApi({
  reducerPath: "PatientApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    createBookingAppointment: builder.mutation({
      query: (data) => ({
        url: "api/v1/Patient-booking-appointments",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useCreateBookingAppointmentMutation } = PatientApi;
export default PatientApi;
