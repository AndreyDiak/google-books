import { Book, BookPreview, GBook } from '../typings';

export class BookConverter {
   static convertToPreview(book: GBook | undefined): BookPreview {
      if (!book) {
         return {} as BookPreview;
      }

      return {
         id: book?.id ?? null,
         authors: book.volumeInfo?.authors ?? null,
         category: book.volumeInfo?.categories?.[0] ?? null,
         title: book.volumeInfo?.title ?? null,
         imgUrl: book.volumeInfo?.imageLinks?.thumbnail ?? null,
      };
   }
   static convertToData(book: GBook | undefined): Book {
      if (!book) {
         return {} as Book;
      }

      return {
         id: book?.id ?? null,
         authors: book.volumeInfo?.authors ?? null,
         categories: book.volumeInfo?.categories ?? null,
         title: book.volumeInfo?.title ?? null,
         description: book.volumeInfo?.description ?? null,
         imgUrl: book.volumeInfo?.imageLinks?.thumbnail ?? null,
      };
   }
}
