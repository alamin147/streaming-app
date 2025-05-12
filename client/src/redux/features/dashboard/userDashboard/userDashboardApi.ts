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
        console.log(data)
        return {
          url:  `/dashboard/user/my-videos/${data.videoId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["myVideosUser"],
    }),
  }),
});

export const { useGetMyVideosQuery, useUpdateMyVideosMutation } = userDashboardApi;
