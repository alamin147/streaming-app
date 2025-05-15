import { baseApi } from '../../../api/baseApi';

const userDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   getAllVideos: builder.query({
      query: () => {
        return {
          url: "/dashboard/admin/all-videos",
          method: "GET",
        };
      },
      providesTags: ["adminVideos"],
    }),

    changeVideoStatus: builder.mutation({
      query: ({videoId, status}) => {
        return {
          url: `/dashboard/admin/change-video-status/${videoId}`,
          method: "PATCH",
          body: {status},
        };
      },
      invalidatesTags: ["adminVideos"],
    }),

  }),
});

export const {
  useGetAllVideosQuery,
  useChangeVideoStatusMutation
} = userDashboardApi;
