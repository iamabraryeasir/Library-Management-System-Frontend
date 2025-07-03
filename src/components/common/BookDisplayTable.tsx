import type { IBook } from '@/types/book.type';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { Edit, EyeIcon, TrashIcon } from 'lucide-react';

export default function BookDisplayTable({
  books,
}: {
  books: IBook[] | undefined;
}) {
  const handleDeleteBook = (bookId: string | undefined) => {
    console.log(bookId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>ISBN</TableHead>
          <TableHead>Copies</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books?.map((book) => (
          <TableRow>
            <TableHead>{book.title}</TableHead>
            <TableHead>{book.author}</TableHead>
            <TableHead>{book.genre}</TableHead>
            <TableHead>{book.isbn}</TableHead>
            <TableHead>{book.copies}</TableHead>
            <TableHead>
              {book.available ? 'Available' : 'Not Available'}
            </TableHead>
            <TableHead className="flex items-center gap-4 justify-end">
              <Link to={`/books/${book._id}`}>
                <Button className="bg-green-500">
                  <EyeIcon />
                </Button>
              </Link>
              <Link to={`/edit-book/${book._id}`}>
                <Button className="bg-blue-500">
                  <Edit />
                </Button>
              </Link>
              <Button
                onClick={() => handleDeleteBook(book?._id)}
                className="bg-red-500"
              >
                <TrashIcon />
              </Button>
            </TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
