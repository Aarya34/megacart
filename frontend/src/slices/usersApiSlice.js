import { get } from "mongoose";
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { data } from "react-router-dom";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation} = usersApiSlice;