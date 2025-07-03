import { Route, Routes } from 'react-router';

import {
  HomePage,
  AllBooksPage,
  BookFormPage,
  BorrowBookPage,
  BorrowSummaryPage,
  DetailedBookPage,
} from './pages';
import { Footer, Navbar } from './components/common';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<AllBooksPage />} />
        <Route path="/create-book" element={<BookFormPage />} />
        <Route path="/books/:bookId" element={<DetailedBookPage />} />
        <Route path="/edit-book/:bookId" element={<BookFormPage />} />
        <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
        <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
      </Routes>
      <Footer />
    </>
  );
}
