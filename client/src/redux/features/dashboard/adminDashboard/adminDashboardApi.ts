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

  }),
});

export const { useGetAllVideosQuery} = userDashboardApi;
