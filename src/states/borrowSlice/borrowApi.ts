import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBook } from '@/types/book.type';

const baseUrl = import.meta.env.VITE_BASE_URL;

interface BorrowedBook {
  _id: string;
  book: string | IBook;
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface BorrowRequest {
  book: string | undefined;
  quantity: number;
  dueDate: string;
}

interface BorrowResponse {
  success: boolean;
  message: string;
  data: BorrowedBook;
}

interface BorrowSummaryItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowSummaryItem[];
}

export const borrowApi = createApi({
  reducerPath: 'borrow',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Book', 'BorrowSummary'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<BorrowResponse, BorrowRequest>({
      query: (body) => ({
        url: '/borrow',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_unused1, _unused2, arg) => [
        { type: 'Book', id: arg.book },
        { type: 'Book', id: 'LIST' },
        'BorrowSummary',
      ],
    }),
    getBorrowSummary: builder.query<BorrowSummaryResponse, void>({
      query: () => ({
        url: '/borrow',
        method: 'GET',
      }),
      providesTags: ['BorrowSummary'],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
