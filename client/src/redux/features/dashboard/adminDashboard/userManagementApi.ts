import { baseApi } from '../../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.search) queryParams.append('search', params.search);

        const queryString = queryParams.toString();
        return {
          url: `/dashboard/admin/users/all-users${queryString ? `?${queryString}` : ''}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => {
        return {
          url: `/dashboard/admin/users/update-user-status/${userId}`,
          method: "PATCH",
          body: { status },
        };
      },
      invalidatesTags: ["user"],
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role }) => {
        return {
          url: `/dashboard/admin/users/update-user-role/${userId}`,
          method: "PATCH",
          body: { role },
        };
      },
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => {
        return {
          url: `/dashboard/admin/users/delete-user/${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userManagementApi;
