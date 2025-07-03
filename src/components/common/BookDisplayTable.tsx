import type { IBook } from '@/types/book.type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { Edit, EyeIcon, TrashIcon } from 'lucide-react';
import DeleteBookButtonWithConfirm from './DeleteBookButtonWithConfirm';

export default function BookDisplayTable({
  books,
}: {
  books: IBook[] | undefined;
}) {
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
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{book.isbn}</TableCell>
            <TableCell>{book.copies}</TableCell>
            <TableCell>
              {book.available ? 'Available' : 'Not Available'}
            </TableCell>
            <TableCell className="flex items-center gap-4 justify-end">
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
              <DeleteBookButtonWithConfirm
                bookId={book?._id}
                trigger={<TrashIcon />}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
