import { useState } from 'react';
import { useDeleteBookMutation } from '@/states/bookSlice/bookApi';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteBookButtonWithConfirmProps {
  bookId: string | undefined;
  onDeleted?: () => void;
  trigger?: string | React.ReactNode;
  confirmText?: string | React.ReactElement;
  cancelText?: string;
  dialogTitle?: string | React.ReactElement;
  dialogDescription?: string;
}

export default function DeleteBookButtonWithConfirm({
  bookId,
  onDeleted,
  trigger = 'Delete',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  dialogTitle = 'Delete Book',
  dialogDescription = 'Are you sure you want to delete this book? This action cannot be undone.',
}: DeleteBookButtonWithConfirmProps) {
  const [open, setOpen] = useState(false);
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = async () => {
    await deleteBook(bookId!).unwrap();
    setOpen(false);
    onDeleted?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">{trigger}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
