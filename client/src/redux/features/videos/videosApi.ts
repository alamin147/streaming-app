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
    getWatchLaterVideos: builder.query({
      query: () => {
        return {
          url: "/videos/watchlater",
          method: "GET",
        };
      },
      providesTags: ["recent"],
    }),
    addToWatchLater: builder.mutation({
      query: (data) => {
        return {
          url: `/videos/watchlater/${data.id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["watchLater"],
    }),
    isBookmarked: builder.query({
      query: (data) => {
        return {
          url: `/videos/bookmarked/${data.id}`,
          method: "GET",
        };
      },
      providesTags: ["watchLater"],
    }),
    recordVideoView: builder.mutation({
      query: (id) => {
        return {
          url: `/videos/view/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["video"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useUploadVideoMutation,
  useGetSingleVideoQuery,
  useGetRecentVideosQuery,
  useUploadRecentVideosMutation,
  useAddToWatchLaterMutation,
  useIsBookmarkedQuery,
  useGetWatchLaterVideosQuery,
  useRecordVideoViewMutation
} = videoApi;
