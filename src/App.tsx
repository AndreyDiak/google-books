import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Header } from './components';
import { BookPage, BooksPage } from './pages';

const router = createBrowserRouter([
   {
      path: '/',
      element: <BooksPage />,
   },
   {
      path: '/books/:bookId',
      element: <BookPage />,
   },
]);

export const App = () => {
   return (
      <div className="flex flex-col h-screen">
         <Header />
         <RouterProvider router={router} />
      </div>
   );
};
