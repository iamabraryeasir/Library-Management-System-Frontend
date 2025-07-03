import { useState } from 'react';
import { useAddBookMutation } from '@/states/bookSlice/bookApi';
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
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

export default function CreateBookPage() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 0,
    available: true,
  });
  const [addBook, { isLoading }] = useAddBookMutation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    console.log(form);

    const payload = {
      ...form,
      genre: form.genre as GenreEnum,
    };
    try {
      await addBook(payload).unwrap();
      toast.success('Book added successfully!');
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

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Book'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
