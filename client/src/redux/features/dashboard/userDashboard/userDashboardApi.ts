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
  }),
});

export const { useGetMyVideosQuery } = userDashboardApi;
