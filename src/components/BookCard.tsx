import React from 'react';
import { Link } from 'react-router-dom';
import { BookPreview } from '../typings';
import { parseList } from '../utils';

interface Props {
   book: BookPreview;
   index: number;
}

export const BookCard: React.FC<Props> = React.memo(({ book, index }) => {
   const e2e = `books:Card:${index}}`;
   return (
      <Link
         to={`/books/${book.id}`}
         className="py-10 px-5 rounded-md bg-white w-[300px] flex flex-col gap-y-4 items-center cursor-pointer hover:bg-red-50 justify-between max-[1024px]:w-[250px]"
         data-e2e={e2e}
      >
         <div className="text-center">
            {book.imgUrl && <img src={book.imgUrl} alt="No picture(" />}
         </div>
         <h3
            className="self-start text-gray-600 font-semibold underline"
            data-e2e={`${e2e}:Category`}
         >
            {book.category}
         </h3>
         <h2
            className="font-bold font-sans text-lg self-start max-[1024px]:text-base"
            data-e2e={`${e2e}:Title`}
         >
            {book.title}
         </h2>
         <div className="justify-self-end self-start text-gray-700" data-e2e={`${e2e}:Authors`}>
            {parseList(book.authors, { inter: ', ', ending: '.' })?.map((author) => (
               <span key={author}>{author}</span>
            ))}
         </div>
      </Link>
   );
});
