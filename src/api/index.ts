import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BaseQueryApi} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {Comment, Post, User} from '../types';

const prepareHeaders = (
  headers: Headers,
  _queryApi: Pick<
    BaseQueryApi,
    'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
  >,
) => {
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  prepareHeaders,
});

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Post', 'User'],
  baseQuery: baseQuery,
  endpoints: builder => ({
    fetchPosts: builder.query<Post[], void>({
      query: () => '/posts',
    }),
    fetchPostById: builder.query<Post, number>({
      query: (id: number) => `/posts/${id}`,
    }),
    createPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query: body => ({url: '/posts', method: 'POST', body}),
    }),
    fetchUserById: builder.query<User, number>({
      query: (id: number) => `/users/${id}`,
    }),
    fetchPostComments: builder.query<Comment[], number>({
      query: (postId: number) => `/posts/${postId}/comments`,
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useFetchPostByIdQuery,
  useCreatePostMutation,
  useFetchUserByIdQuery,
  useFetchPostCommentsQuery,
} = api;
export default api;
