import { Categories, GBook, OrderBy } from '../typings';

interface GetByNameOptions {
   startIndex: number;
   maxResult: number;
   category?: Categories;
   orderBy?: OrderBy;
}

interface Data {
   kind: string;
   totalItems: number;
   items: GBook[];
}

class BookService {
   async getByName(name: string, options?: GetByNameOptions): Promise<Data | undefined> {
      const {
         startIndex = 0,
         maxResult = 30,
         category = Categories.ALL,
         orderBy = OrderBy.RELEVANCE,
      } = options ?? {};

      const url = new URL(import.meta.env.VITE_API_URL);

      url.searchParams.set(
         'q',
         `${name}${category && category !== Categories.ALL ? `+subject:${category}` : ''}`,
      );

      url.searchParams.set('startIndex', String(startIndex * maxResult));
      url.searchParams.set('maxResults', String(maxResult));
      url.searchParams.set('orderBy', String(orderBy));
      url.searchParams.set('key', String(import.meta.env.VITE_API_KEY));

      try {
         const res = await fetch(url, {
            method: 'GET',
         });

         if (!res.ok) {
            const err = await res.json();
            console.log(err.messages[0]);
         }

         return res.json();
      } catch (e) {
         console.log((e as Error).message);
         return;
      }
   }

   async getById(id: string): Promise<GBook | undefined> {
      try {
         const res = await fetch(
            `${import.meta.env.VITE_API_URL}/${id}?key=${import.meta.env.VITE_API_KEY}`,
         );

         if (!res.ok) {
            const err = await res.json();
            console.log(err.messages[0]);
         }

         return res.json();
      } catch (e) {
         console.log((e as Error).message);
         return;
      }
   }
}

export default new BookService();
