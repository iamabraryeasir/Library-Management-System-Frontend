import { BookOpen, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-5 lg:px-0 py-3 flex items-center justify-between">
        <Link to="/">
          <div className="font-bold text-3xl flex items-center">
            <BookOpen className="w-8 h-8 mr-3" />
            Lib<span className="text-green-500">Manager</span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/books" className="hover:text-green-600 transition-colors">
            All Books
          </Link>
          <Link
            to="/borrow-summary"
            className="hover:text-green-600 transition-colors"
          >
            Borrow Summary
          </Link>
          <Link to="/create-book">
            <Button variant="myTheme">
              <Plus />
              Add Book
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
