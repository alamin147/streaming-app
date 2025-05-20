import { baseApi } from "../../api/baseApi";

const videoFeatures = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getComments: builder.query({
      query: (id:any) => {
        return {
          url: `/videos/comments/${id.id}`,
          method: "GET",
        };
      },
      providesTags: ["comment"],
    }),
    addComment: builder.mutation({
      query: (data) => {
        return {
          url: `/videos/comments`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["comment"],
    }),

    addRating: builder.mutation({
      query: (data) => {
        return {
          url: `/videos/ratings/addRating/${data.videoId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["singleVideo"],
    }),
  }),
});

export const {

  useAddCommentMutation,
  useGetCommentsQuery,
  useAddRatingMutation
} = videoFeatures;
