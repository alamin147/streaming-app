import { baseApi } from "../../api/baseApi";

const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadVideo: builder.mutation({
      query: (data) => {
        return {
          url: "/videos/upload",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["video"],
    }),
    getVideos: builder.query({
      query: () => {
        // console.log(status);
        return {
          url: `/videos/random`,
          method: "GET",
        };
      },
      providesTags: ["video"],
    }),
    getSingleVideo: builder.query({
      query: (id: any) => {
        console.log(id.id);
        return {
          url: `/videos/find/${id.id}`,
          method: "GET",
        };
      },
    }),

    uploadRecentVideos: builder.mutation({
      query: (data) => {
        return {
          url: "/videos/recentVideos",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["recent"],
    }),
    getRecentVideos: builder.query({
      query: () => {
        return {
          url: "/videos/recentVideos",
          method: "GET",
        };
      },
      providesTags: ["recent"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useUploadVideoMutation,
  useGetSingleVideoQuery,
  useGetRecentVideosQuery,
  useUploadRecentVideosMutation,
} = videoApi;
