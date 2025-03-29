import { baseApi } from "../../api/baseApi";

const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVideo: builder.mutation({
      query: (data) => {
        return {
          url: "/task/create",
          method: "POST",
          body: data,
        };
      },
    }),
    uploadVideo: builder.mutation({
      query: (data) => {
        return {
          url: "/videos/upload",
          method: "POST",
          body: data,
        };
      },
    }),
    getVideos: builder.query({
      query: () => {
        // console.log(status);
        return {
          url: `/videos/random`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateVideoMutation,
  useGetVideosQuery,
  useUploadVideoMutation,
} = videoApi;
