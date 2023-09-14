import { useMemo, useState } from 'react';
import { useEffect, useCallback } from 'react';
import { Book } from '../typings';
import { selectBookById, setBooks } from '../features/booksSlice';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { BookConverter } from '../utils';
import { useAppDispatch } from '.';
import bookService from '../api/book.service';

interface UseBook {
   book: Book;
   isError: boolean;
   isLoading: boolean;
}

export function useBook(bookId: string): UseBook {
   const dispatch = useAppDispatch();

   const rawBookSelector = useCallback(
      (s: RootState, bookId: string) => selectBookById(s, bookId),
      [],
   );

   const rawBook = useSelector((s: RootState) => rawBookSelector(s, bookId));

   const loadBook = useCallback(async () => {
      setIsError(false);
      setIsLoading(true);
      const data = await bookService.getById(bookId);
      setIsLoading(false);

      if (!data) {
         setIsError(true);
         return;
      }

      dispatch(setBooks({ books: [data], isNew: true }));
   }, [bookId, dispatch]);

   const [isError, setIsError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (rawBook) return;
      // запросить c API данные про книгу

      loadBook();
   }, [loadBook, rawBook]);

   return useMemo(() => {
      const book = BookConverter.convertToData(rawBook) ?? {};

      return { book, isError, isLoading };
   }, [isError, isLoading, rawBook]);
}
