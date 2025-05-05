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
      invalidatesTags:["video"]
    }),
    getVideos: builder.query({
      query: () => {
        // console.log(status);
        return {
          url: `/videos/random`,
          method: "GET",
        };
      },
      providesTags:["video"]
    }),
    getSingleVideo: builder.query({
      query: ({ id }: { id: string }) => {
        // console.log(status);
        return {
          url: `/videos/find/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useUploadVideoMutation,
  useGetSingleVideoQuery,
} = videoApi;
