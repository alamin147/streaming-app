import { baseApi } from '../../../api/baseApi';

const dashboardStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboardStats: builder.query({
      query: () => {
        return {
          url: "/dashboard/user/stats",
          method: "GET",
        };
      },
      providesTags: ["myVideosUser"],
    }),
    getUserRecentUploads: builder.query({
      query: () => {
        return {
          url: "/dashboard/user/recent-uploads",
          method: "GET",
        };
      },
      providesTags: ["myVideosUser"],
    }),
  }),
});

export const {
  useGetUserDashboardStatsQuery,
  useGetUserRecentUploadsQuery,
} = dashboardStatsApi;
