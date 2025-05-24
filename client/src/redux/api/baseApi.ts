import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const VITE_SERVER_URI = import.meta.env.VITE_SERVER_URI;

// const baseUrl = 'http://localhost:5173/api/v1';

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_SERVER_URI,
        credentials: "include",

        // mode: "no-cors",
        // credentials: "same-origin",
        // mode: "same-origin",
        // mode: "cors",
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Credentials": "true",
        // },
prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
        headers.set("authorization", `${token}`);
    }

    headers.set("Content-Type", "application/json");

    return headers;
}

    }),

    tagTypes: [
        "video",
        "user",
        "recent",
        "watchLater",
        "comment",
        "myVideosUser",
        "adminVideos",
        "singleVideo",
    ],
    endpoints: () => ({}),
});
