import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    loginUser: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),

    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: data,
        };
      },
    }),
    

  }),
});

export const { useRegisterUserMutation ,useLoginUserMutation} = authApi;