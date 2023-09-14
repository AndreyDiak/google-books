import { createRef, useContext } from 'react';
import { Selector } from '.';
import { BooksContext } from '../context/BooksProvider';
import { Categories, OrderBy } from '../typings';

const categories = Object.values(Categories);
const orders = Object.values(OrderBy);

export const Header = () => {
   const { loadBooks, updateCategory, updateOrder } = useContext(BooksContext);

   const handleSearch = () => {
      loadBooks(inputRef.current?.value ?? '');
   };

   const inputRef = createRef<HTMLInputElement>();

   return (
      <div className="bg-gray-700 flex justify-center items-center py-10">
         <div className="flex flex-col space-y-4 items-center text-white font-mono">
            <h2 className="font-bold text-xl">Search books</h2>
            <div className="bg-white rounded-full py-2 px-4">
               <input
                  type="text"
                  ref={inputRef}
                  placeholder="book title..."
                  className=" focus:outline-none text-black"
                  data-e2e="search:Input"
                  onKeyDown={(e) => {
                     if (e.key !== 'Enter') return;
                     handleSearch();
                  }}
               />{' '}
               <button
                  onClick={handleSearch}
                  className="pointer hover:text-red-500 text-black font-sans font-medium"
                  data-e2e="search:Button"
               >
                  Search
               </button>
            </div>
            <div className="flex space-x-4">
               <div className="">
                  Categories{' '}
                  <Selector
                     defaultValue={Categories.ALL}
                     options={categories}
                     onChangeHandler={updateCategory}
                     data-e2e="search:Category"
                  />
               </div>
               <div>
                  Sorting by{' '}
                  <Selector
                     defaultValue={OrderBy.RELEVANCE}
                     options={orders}
                     onChangeHandler={updateOrder}
                     data-e2e="search:Order"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
