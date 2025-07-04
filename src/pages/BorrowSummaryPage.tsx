import { useGetBorrowSummaryQuery } from '@/states/borrowSlice/borrowApi';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export default function BorrowSummaryPage() {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();
  const summary = data?.data;

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">Borrow Summary</h1>
      {isLoading ? (
        <div className="py-16 text-center text-muted-foreground">
          Loading summary...
        </div>
      ) : error ? (
        <div className="py-16 text-center text-red-500">
          Failed to load summary.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Quantity Borrowed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summary && summary.length > 0 ? (
              summary.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.book.title}</TableCell>
                  <TableCell>{item.book.isbn}</TableCell>
                  <TableCell>{item.totalQuantity}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  No borrow records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
