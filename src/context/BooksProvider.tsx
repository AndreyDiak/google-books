import { PropsWithChildren, createContext } from 'react';
import { useBooks } from '../hooks';
import { BookPreview, Categories, OrderBy } from '../typings';

interface BooksContextState {
   books: BookPreview[];
   isLoading: boolean;
   isError: boolean;
   isAbleToLoadMore: boolean;
   totalItems: number;
   loadMore(): Promise<void>;
   loadBooks(bookName: string): Promise<void>;
   updateCategory(category: Categories): void;
   updateOrder(order: OrderBy): void;
}

export const BooksContext = createContext<BooksContextState>({} as BooksContextState);

export const BooksProvider = ({ children }: PropsWithChildren<unknown>) => {
   const {
      isLoading,
      isError,
      isAbleToLoadMore,
      totalItems,
      loadMore,
      loadBooks,
      updateCategory,
      updateOrder,
      books,
   } = useBooks();

   return (
      <BooksContext.Provider
         value={{
            books,
            isAbleToLoadMore,
            isError,
            isLoading,
            totalItems,
            loadBooks,
            loadMore,
            updateCategory,
            updateOrder,
         }}
      >
         {children}
      </BooksContext.Provider>
   );
};
