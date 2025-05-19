import { baseApi } from '../../../api/baseApi';

const userDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   getDashboardStats: builder.query({
      query: () => {
        return {
          url: "/dashboard/admin/stats",
          method: "GET",
        };
      },
      providesTags: ["adminVideos"],
    }),

   getAllVideos: builder.query({
      query: () => {
        return {
          url: "/dashboard/admin/all-videos",
          method: "GET",
        };
      },
      providesTags: ["adminVideos"],
    }),

    getPendingVideos: builder.query({
      query: () => {
        return {
          url: "/dashboard/admin/pending-videos",
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

    deleteVideo: builder.mutation({
      query: (videoId) => {
        return {
          url: `/dashboard/admin/delete-video/${videoId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["adminVideos"],
    }),

    approveVideo: builder.mutation({
      query: (videoId) => {
        return {
          url: `/dashboard/admin/approve-video/${videoId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["adminVideos"],
    }),

    rejectVideo: builder.mutation({
      query: (videoId) => {
        return {
          url: `/dashboard/admin/reject-video/${videoId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["adminVideos"],
    }),

  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllVideosQuery,
  useChangeVideoStatusMutation,
  useDeleteVideoMutation,
  useGetPendingVideosQuery,
  useApproveVideoMutation,
  useRejectVideoMutation
} = userDashboardApi;
