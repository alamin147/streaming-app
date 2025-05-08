import { baseApi } from "../../api/baseApi";

const videoFeatures = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getComments: builder.query({
      query: () => {
        return {
          url: "/videos/watchlater",
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

  }),
});

export const {

  useAddCommentMutation,
  useGetCommentsQuery
} = videoFeatures;
