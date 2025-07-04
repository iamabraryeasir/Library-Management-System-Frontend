import { useState } from 'react';
import { useBorrowBookMutation } from '@/states/borrowSlice/borrowApi';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

interface BorrowBookButtonWithConfirmProps {
  bookId: string | undefined;
  availableCopies: number;
  trigger?: React.ReactNode;
}

export default function BorrowBookButtonWithConfirm({
  bookId,
  availableCopies,
  trigger = <Button>Borrow</Button>,
}: BorrowBookButtonWithConfirmProps) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const handleBorrow = async () => {
    if (quantity < 1 || quantity > availableCopies) {
      setError('Quantity must be between 1 and available copies.');
      return;
    }
    if (!dueDate) {
      setError('Please select a due date.');
      return;
    }
    try {
      await borrowBook({ book: bookId, quantity, dueDate }).unwrap();
      toast.success('Book borrowed successfully!');
      setOpen(false);
      navigate('/borrow-summary');
    } catch (err: unknown) {
      let errorMsg = 'Failed to borrow book.';
      if (typeof err === 'object' && err !== null) {
        const errorObj = err as {
          data?: { message?: string };
          message?: string;
        };
        if (errorObj.data?.message) errorMsg = errorObj.data.message;
        else if (errorObj.message) errorMsg = errorObj.message;
      }
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <DialogDescription>
            Enter the quantity and due date to borrow this book.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <label className="block font-medium">
            Quantity (max {availableCopies})
          </label>
          <Input
            type="number"
            min={1}
            max={availableCopies}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            disabled={isLoading}
          />
          <label className="block font-medium">Due Date</label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={isLoading}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleBorrow}
            disabled={isLoading || quantity < 1 || quantity > availableCopies}
          >
            {isLoading ? 'Borrowing...' : 'Borrow'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
