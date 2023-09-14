import React from 'react';
import { useParams } from 'react-router-dom';
import { useBook } from '../hooks';
import { Link } from 'react-router-dom';
import { parseList } from '../utils';
export const BookPage = React.memo(() => {
   const { bookId } = useParams();

   const {
      book: { imgUrl, categories, title, authors, description },
   } = useBook(bookId ?? '');

   return (
      <div className="flex flex-col flex-1 px-4 py-4 font-sans bg-gray-200">
         <div className="text-center text-blue-500 font-sans text-lg py-2">
            <Link to="/" className="underline hover:text-blue-700" data-e2e="book:Back">
               Back to book list
            </Link>
         </div>
         <div className="flex flex-1 justify-center items-center space-x-10">
            <div className="min-w-[300px] max-h-[500px] flex justify-center">
               {imgUrl && <img src={imgUrl} alt="No picture(" />}
            </div>
            <div>
               {/* categories */}
               <div className="flex space-x-2 my-2" data-e2e="book:Categories">
                  {parseList(categories, { inter: ' / ' }).map((category) => (
                     <span key={category} className="text-gray-500 font-semibold text-lg">
                        {category}
                     </span>
                  ))}
               </div>
               {/* title */}
               <h2 className="font-bold text-2xl my-2" data-e2e="book:Title">
                  {title}
               </h2>
               {/* authors */}
               <div className="flex space-x-2 my-2" data-e2e="book:Authors">
                  {parseList(authors, { inter: ', ', ending: '.' }).map((author) => (
                     <span key={author} className="text-gray-500 font-semibold">
                        {author}
                     </span>
                  ))}
               </div>
               {/* description */}
               <div
                  className="border-gray-50 border-4 rounded-lg py-2 px-4 bg-white shadow-lg max-w-[600px]"
                  data-e2e="book:Description"
               >
                  {description}
               </div>
            </div>
         </div>
      </div>
   );
});
