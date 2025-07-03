import type { IBook } from '@/types/book.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_BASE_URL;

interface BookResponse {
  success: boolean;
  message: string;
  data: {
    books: IBook[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
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
          page?: number;
        } | void
      >({
        query: (params) => {
          const queryParams = new URLSearchParams();
          if (params?.limit)
            queryParams.append('limit', params.limit.toString());
          if (params?.sort) queryParams.append('sort', params.sort);
          if (params?.filter) queryParams.append('genre', params.filter);
          if (params?.page) queryParams.append('page', params.page.toString());
          const queryString = queryParams.toString();
          return `/books${queryString ? `?${queryString}` : ''}`;
        },
      }),
    };
  },
});

export const { useGetBooksQuery } = bookApiSlice;
