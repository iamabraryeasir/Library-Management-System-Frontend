import type { IBook } from '@/types/book.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_BASE_URL;

interface BookResponse {
  success: boolean;
  message: string;
  data: IBook[];
}

export const bookApiSlice = createApi({
  reducerPath: 'books',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => {
    return {
      getBooks: builder.query<
        BookResponse,
        {
          limit?: number;
          sort?: 'asc' | 'desc';
          filter?: IBook['genre'];
        } | void
      >({
        query: (params) => {
          const queryParams = new URLSearchParams();
          if (params?.limit)
            queryParams.append('limit', params.limit.toString());
          if (params?.sort) queryParams.append('sort', params.sort);
          if (params?.filter) queryParams.append('genre', params.filter);
          const queryString = queryParams.toString();
          return `/books${queryString ? `?${queryString}` : ''}`;
        },
      }),
    };
  },
});

export const { useGetBooksQuery } = bookApiSlice;
