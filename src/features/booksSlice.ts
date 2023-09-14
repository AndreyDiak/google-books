import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { GBook } from '../typings';

interface CounterState {
   books: GBook[];
}

const initialState: CounterState = {
   books: [],
};

export const booksSlice = createSlice({
   name: 'books',
   initialState,
   reducers: {
      setBooks: (state, action: PayloadAction<{ books: GBook[]; isNew: boolean }>) => {
         const { books, isNew } = action.payload;
         if (isNew) {
            state.books = books;
         } else {
            state.books.push(...books);
         }
      },
   },
});

export const { setBooks } = booksSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBooks = (state: RootState) => state.books.books;

export const selectBookById = createSelector(
   [selectBooks, (_, bookId: string) => bookId],
   (books, bookId) => books.find((book) => book.id === bookId),
);

export default booksSlice.reducer;
