import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import bookService from '../api/book.service';
import { selectBooks, setBooks } from '../features/booksSlice';
import { RootState } from '../store';
import { BookPreview, Categories, OrderBy } from '../typings';
import { BookConverter } from '../utils/BookConverter';

interface UseBooks {
   updateOrder(order: OrderBy): void;
   updateCategory(category: Categories): void;
   loadBooks(bookName: string): Promise<void>;
   loadMore(): Promise<void>;
   books: BookPreview[];
   totalItems: number;
   isAbleToLoadMore: boolean;
   category: Categories;
   orderBy: OrderBy;
   isLoading: boolean;
   isError: boolean;
}

const PAGINATION_COUNT = 30;

export function useBooks(): UseBooks {
   const dispatch = useAppDispatch();

   const rawBooksSelector = useCallback((s: RootState) => selectBooks(s), []);
   const rawBooks = useAppSelector(rawBooksSelector);

   const [currentPage, setCurrentPage] = useState(0);
   const [totalItems, setTotalItems] = useState(0);

   const [activeCategory, setActiveCategory] = useState<Categories>(Categories.ALL);
   const [activeOrder, setActiveOrder] = useState<OrderBy>(OrderBy.RELEVANCE);

   // данные прошлого запроса
   const [prevOptions, setPrevOptions] = useState({
      query: '',
      category: Categories.ALL,
      order: OrderBy.RELEVANCE,
   });

   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);

   const isAbleToLoadMore = useMemo(
      () => totalItems > currentPage * PAGINATION_COUNT,
      [totalItems, currentPage],
   );

   const loadBooks = useCallback(
      async (name: string) => {
         setIsLoading(true);
         setIsError(false);

         const isNew =
            activeCategory !== prevOptions.category ||
            name !== prevOptions.query ||
            activeOrder !== prevOptions.order;

         const data = await bookService.getByName(name, {
            startIndex: !isNew ? currentPage : 0,
            maxResult: PAGINATION_COUNT,
            category: activeCategory,
            orderBy: activeOrder,
         });
         setIsLoading(false);

         if (!data?.items) {
            setIsError(true);
            return;
         }

         // если обновилась категория, сортировка или имя книги то полностью обновляем данные
         // если все старое, то просто дозагружаем
         if (isNew) {
            setCurrentPage(0);
            setTotalItems(data.totalItems);

            setPrevOptions((prev) => ({
               ...prev,
               query: name,
               category: activeCategory,
               order: activeOrder,
            }));
         }

         setCurrentPage((prev) => prev + 1);

         dispatch(setBooks({ books: data.items, isNew }));
      },
      [
         activeCategory,
         activeOrder,
         currentPage,
         dispatch,
         prevOptions.category,
         prevOptions.order,
         prevOptions.query,
      ],
   );

   const loadMore = useCallback(async () => {
      await loadBooks(prevOptions.query);
   }, [loadBooks, prevOptions.query]);

   return useMemo(() => {
      const books = rawBooks?.map((book) => BookConverter.convertToPreview(book)) ?? [];

      return {
         books,
         totalItems,
         isAbleToLoadMore,
         category: activeCategory,
         orderBy: activeOrder,
         isError,
         isLoading,
         loadBooks,
         loadMore,
         updateCategory: setActiveCategory,
         updateOrder: setActiveOrder,
      };
   }, [
      rawBooks,
      totalItems,
      isAbleToLoadMore,
      activeCategory,
      activeOrder,
      isError,
      isLoading,
      loadBooks,
      loadMore,
   ]);
}
