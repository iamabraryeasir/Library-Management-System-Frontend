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
      getRecentAddedBooks: builder.query<BookResponse, void>({
        query: () => '/books?limit=8',
      }),
    };
  },
});

export const { useGetRecentAddedBooksQuery } = bookApiSlice;
