import { baseApi } from '../../../api/baseApi';

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // For users to report a video
    reportVideo: builder.mutation({
      query: (data) => {
        return {
          url: "/reports",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["adminVideos"],
    }),

    // For admins to get all reports
    getAllReports: builder.query({
      query: () => {
        return {
          url: "/reports/all",
          method: "GET",
        };
      },
      providesTags: ["adminVideos"],
    }),

    // For admins to get report details
    getReportDetails: builder.query({
      query: (reportId) => {
        return {
          url: `/reports/${reportId}`,
          method: "GET",
        };
      },
      providesTags: ["adminVideos"],
    }),

    // For admins to update report status
    updateReportStatus: builder.mutation({
      query: ({reportId, status}) => {
        return {
          url: `/reports/${reportId}/status`,
          method: "PATCH",
          body: { status },
        };
      },
      invalidatesTags: ["adminVideos"],
    }),
  }),
});

export const {
  useReportVideoMutation,
  useGetAllReportsQuery,
  useGetReportDetailsQuery,
  useUpdateReportStatusMutation
} = reportApi;
