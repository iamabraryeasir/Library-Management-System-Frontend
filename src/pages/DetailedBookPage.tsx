import DeleteBookButtonWithConfirm from '@/components/common/DeleteBookButtonWithConfirm';
import { Button } from '@/components/ui/button';
import { useGetBookByIdQuery } from '@/states/bookSlice/bookApi';
import { useNavigate, useParams } from 'react-router';

export default function DetailedBookPage() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { data } = useGetBookByIdQuery(bookId!);
  const book = data?.data;
  return (
    <div className="max-w-2xl mx-auto mt-16 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-lg rounded-3xl p-12 relative border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
        <div className="flex-1">
          <h1 className="text-5xl font-black text-slate-900 mb-1 tracking-tight">
            {book?.title}
          </h1>
          <p className="text-xl text-slate-500 mb-8 font-medium">
            {book?.author}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                Genre
              </span>
              <span className="text-base font-semibold text-slate-700">
                {book?.genre.replace('_', ' ')}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                ISBN
              </span>
              <span className="text-base font-semibold text-slate-700">
                {book?.isbn}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                Published
              </span>
              <span className="text-base font-semibold text-slate-700">
                {book?.createdAt
                  ? new Date(book.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                Copies
              </span>
              <span className="text-base font-semibold text-slate-700">
                {book?.copies}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                Available
              </span>
              <span
                className={`text-base font-bold ${
                  book?.available ? 'text-emerald-600' : 'text-rose-500'
                }`}
              >
                {book?.available ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          <div className="mb-10">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
              Description
            </span>
            <p className="text-slate-700 mt-3 text-lg leading-relaxed">
              {book?.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-12">
        <Button
          variant="outline"
          className="border-blue-600 text-blue-700 hover:bg-blue-50 px-7 py-2.5 rounded-xl font-semibold shadow-sm transition-all"
        >
          Edit
        </Button>
        <DeleteBookButtonWithConfirm
          bookId={book?._id}
          onDeleted={() => navigate('/books')}
        />
      </div>
    </div>
  );
}
