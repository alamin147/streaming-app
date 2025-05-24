import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// const VITE_SERVER_URI = import.meta.env.VITE_SERVER_URI;

const baseUrl = 'https://streaming-server-gilt.vercel.app/api/v1';

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `${token}`);
      }

      headers.set('Content-Type', 'application/json');

      headers.set('Access-Control-Allow-Credentials', 'true');

      return headers;
    },
    }),

tagTypes:["video","user","recent","watchLater","comment","myVideosUser","adminVideos","singleVideo"],
  endpoints: () => ({}),
});
