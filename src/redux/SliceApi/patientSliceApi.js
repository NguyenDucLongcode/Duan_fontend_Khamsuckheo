import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalBackend } from "../../utilities/Common";

export const PatientApi = createApi({
  reducerPath: "PatientApi",
  baseQuery: fetchBaseQuery({ baseUrl: LocalBackend() }),
  endpoints: (builder) => ({
    createBookingAppointment: builder.mutation({
      query: (data) => ({
        url: "api/v1/Patient-booking-appointments",
        method: "POST",
        body: data,
      }),
    }),
    verifyBookingAppointment: builder.mutation({
      query: (data) => ({
        url: "api/v1/verify-booking-appointments",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateBookingAppointmentMutation,
  useVerifyBookingAppointmentMutation,
} = PatientApi;
export default PatientApi;
