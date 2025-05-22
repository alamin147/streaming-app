import { baseApi } from '../../../api/baseApi';

const userDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   getMyVideos: builder.query({
      query: (data) => {
        return {
          url: "/dashboard/user/my-videos",
          method: "GET",
          body: data,
        };
      },
      providesTags: ["myVideosUser"],
    }),
   updateMyVideos: builder.mutation({
      query: (data) => {
        return {
          url:  `/dashboard/user/my-videos/${data.videoId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["myVideosUser"],
    }),
    deleteMyVideos: builder.mutation({
      query: (data) => {
        return {
          url:  `/dashboard/user/my-videos/${data.videoId}`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["myVideosUser"],
  }),

  editProfile: builder.mutation({
    query: (data) => {
      return {
        url:  `/dashboard/user/edit-profile`,
        method: "PATCH",
        body: data,
      };
    }
  }),
  }),
});

export const { useGetMyVideosQuery, useUpdateMyVideosMutation , useDeleteMyVideosMutation, useEditProfileMutation} = userDashboardApi;
