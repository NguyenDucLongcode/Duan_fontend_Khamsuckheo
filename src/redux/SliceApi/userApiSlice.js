import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "CreateUser",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "api/v1/create-user",
        method: "POST",
        body: userData,
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "api/v1/edit-user",
        method: "PUT",
        body: userData,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "api/v1/get-All-User?id=ALL",
        method: "GET",
      }),
    }),
    getUsersById: builder.query({
      query: (userId) => ({
        url: `api/v1/get-All-User?id=${userId}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `api/v1/delete-user?id=${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUsersByIdQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = UserApi;

export default UserApi;
