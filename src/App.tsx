import { Route, Routes } from 'react-router';

import {
  HomePage,
  AllBooksPage,
  CreateBookPage,
  BorrowBookPage,
  BorrowSummaryPage,
  DetailedBookPage,
  EditBookPage,
} from './pages';
import { Footer, Navbar } from './components/common';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<AllBooksPage />} />
        <Route path="/create-book" element={<CreateBookPage />} />
        <Route path="/books/:bookId" element={<DetailedBookPage />} />
        <Route path="/edit-book/:bookId" element={<EditBookPage />} />
        <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
        <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
      </Routes>
      <Footer />
    </>
  );
}
