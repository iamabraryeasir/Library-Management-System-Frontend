import { useGetBooksQuery } from '@/states/bookSlice/bookApi';
import BookDisplayTable from '../common/BookDisplayTable';
import { Loader2Icon } from 'lucide-react';

export default function BooksSection() {
  const { data, isLoading } = useGetBooksQuery({ limit: 8 });
  const recentAddedBooks = data?.data?.books;

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <div className="w-full">
        <h2 className="text-center font-medium text-2xl">
          Recently Added Books
        </h2>
        <div className="w-2/5 h-1 bg-green-500 mx-auto mt-2 rounded"></div>
      </div>
      <div className="w-full mt-5 ">
        {isLoading ? (
          <div className="w-full h-72 flex items-center justify-center">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : (
          <BookDisplayTable books={recentAddedBooks} />
        )}
      </div>
    </div>
  );
}
