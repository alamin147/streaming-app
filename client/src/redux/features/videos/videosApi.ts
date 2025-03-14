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
    getVideos: builder.query({
      query: (status?: string) => {
        // console.log(status);
        return {
          url: `/task/tasks/${status}`,
          method: "GET",
        };
      },
   
    }),
    
  }),
});

export const {
    useCreateVideoMutation,
    useGetVideosQuery,
} = videoApi;
