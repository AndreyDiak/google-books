import { useContext } from 'react';
import { BookCard } from '../components';
import { BooksContext } from '../context/BooksProvider';

export const BooksPage = () => {
   // const { books, isLoading, isError, isAbleToLoadMore, totalItems, loadMore } = useBooks();
   const { isLoading, isError, isAbleToLoadMore, totalItems, books, loadMore } =
      useContext(BooksContext);

   const isFirstLoading = books?.length === 0;

   if (isFirstLoading && isLoading) {
      return <h2 data-e2e="books:loading">Loading books...</h2>;
   }

   if (isError) {
      return <h2 data-e2e="books:notFound">Books not found</h2>;
   }

   if (isFirstLoading) {
      return <h2 data-e2e="books:cap">Try to find something!</h2>;
   }

   return (
      <div className="bg-gray-200 py-5 flex flex-col flex-1 items-center">
         {/* total items count preview */}
         {totalItems && (
            <div className="my-5" data-e2e="books:Total">
               Books found - <b>{totalItems}</b>
            </div>
         )}
         {/* books list */}
         <div className="flex flex-wrap justify-center gap-10" data-e2e="books:List">
            {books.map((book, index) => (
               <BookCard key={Math.random()} book={book} index={index} />
            ))}
         </div>
         {/* Loader with "load more btn" */}
         {isLoading && <div className="text-center mt-5">Loading...</div>}
         {/* "load more btn" */}
         {isAbleToLoadMore && (
            <div className="flex justify-center my-5" data-e2e="books:LoadMore">
               <button
                  onClick={loadMore}
                  className="py-2 px-3 bg-gray-700 rounded-md text-white font-sans hover:bg-gray-800 font-semibold"
               >
                  Load more
               </button>
            </div>
         )}
      </div>
   );
};
