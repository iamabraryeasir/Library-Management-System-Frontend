import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from '@/states/bookSlice/bookApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GenreEnum } from '@/types/book.type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-hot-toast';

export default function EditBookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookByIdQuery(bookId!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 0,
    available: true,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data) {
      const genre = String(data.data.genre || '')
        .toUpperCase()
        .trim();

      const matchedGenre = Object.values(GenreEnum).find(
        (g) => g.toUpperCase() === genre
      );
      setForm({
        title: data.data.title || '',
        author: data.data.author || '',
        genre: matchedGenre || Object.values(GenreEnum)[0],
        isbn: data.data.isbn || '',
        description: data.data.description || '',
        copies: data.data.copies ?? 0,
        available: !!data.data.available,
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'copies' ? Number(value) : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const payload = {
      ...form,
      genre: form.genre as GenreEnum,
    };
    try {
      await updateBook({ id: bookId!, data: payload }).unwrap();
      toast.success('Book updated successfully!');
      navigate('/books');
    } catch (err: unknown) {
      let errorMsg = 'Something went wrong. Please try again.';
      if (typeof err === 'object' && err !== null) {
        const errorObj = err as {
          data?: { message?: string };
          message?: string;
        };
        errorMsg = errorObj?.data?.message || errorObj?.message || errorMsg;
      }
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  // Only render the form if genre is valid
  const genreOptions = Object.values(GenreEnum);
  if (!genreOptions.includes(form.genre as GenreEnum)) {
    return (
      <div className="max-w-xl mx-auto mt-10">
        <Button disabled>Loading book data...</Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <Input
            id="title"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="author" className="block mb-1 font-medium">
            Author
          </label>
          <Input
            id="author"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="genre" className="block mb-1 font-medium">
            Genre
          </label>
          <Select
            value={form.genre}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, genre: value }))
            }
            disabled={isLoading}
          >
            <SelectTrigger id="genre" className="w-full">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(GenreEnum).map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre
                    .charAt(0)
                    .toUpperCase()
                    .concat(genre.slice(1).toLowerCase().replace('_', ' '))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="isbn" className="block mb-1 font-medium">
            ISBN
          </label>
          <Input
            id="isbn"
            name="isbn"
            placeholder="ISBN"
            value={form.isbn}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="copies" className="block mb-1 font-medium">
            Copies
          </label>
          <Input
            id="copies"
            name="copies"
            placeholder="Copies"
            type="number"
            value={form.copies}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="available" className="block mb-1 font-medium">
            Available
          </label>
          <Select
            value={form.available ? 'true' : 'false'}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, available: value === 'true' }))
            }
            disabled={isLoading}
          >
            <SelectTrigger id="available" className="w-full">
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Not Available</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-2">
          <Button type="submit" disabled={isUpdating || isLoading}>
            {isUpdating ? 'Updating...' : 'Update Book'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
