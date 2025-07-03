import BookDisplayTable from '@/components/common/BookDisplayTable';
import { useGetBooksQuery } from '@/states/bookSlice/bookApi';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

export default function AllBooksPage() {
  const [page, setPage] = useState(1);
  const limit = 8; // books per page

  const { data, isLoading, isFetching } = useGetBooksQuery({ page, limit });

  const books = data?.data?.books;
  const total = data?.data?.meta?.total || 0;
  const totalPages = total ? Math.ceil(total / limit) : 1;

  return (
    <>
      <div className="max-w-7xl mx-auto my-10">
        {isLoading || isFetching ? (
          <div className="h-[40rem] w-full flex items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          <BookDisplayTable books={books} />
        )}
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-disabled={page === 1}
                  className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    isActive={page === idx + 1}
                    onClick={() => setPage(idx + 1)}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-disabled={page === totalPages}
                  className={
                    page === totalPages ? 'pointer-events-none opacity-50' : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
