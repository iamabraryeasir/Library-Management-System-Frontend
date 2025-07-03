import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto py-8 px-5 lg:px-0">
      <div className="bg-green-500 py-10 lg:py-20 px-5 flex flex-col items-center text-center rounded-2xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          The Ultimate Solution for your Library Management
        </h1>
        <p className="text-lg md:text-xl text-green-100 font-['Roboto'] mb-8 max-w-xl">
          Streamline your library operations, manage books, and empower your
          community with ease.
        </p>
        <div className="flex gap-4">
          <Link to="/books">
            <Button variant="secondary">All Books</Button>
          </Link>
          <Link to="/create-book">
            <Button variant="secondary">
              <Plus /> Add New
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
