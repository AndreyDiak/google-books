import { capitalizeFirstLetter } from './../../src/utils/capitalizeFirstLetter';
import { getDataByE2E } from '../utils/getters';

describe('Test books page', () => {
   const BASE_URL = 'http://localhost:5173';

   const PAGINATION_STEP = 30;

   const INPUT_TEXT = 'java';

   const BAD_INPUT_TEXT = `${String(Math.random())}sdfas`;

   const CATEGORY = 'computers';

   it('Load more btn visible', () => {
      cy.visit(BASE_URL);
      getDataByE2E('search:Input').type(INPUT_TEXT);
      getDataByE2E('search:Button').click();
      getDataByE2E('books:List').children().should('have.length', PAGINATION_STEP);
      getDataByE2E('books:Total')
         .get('b')
         .then((total) => {
            const value = Number(total.text());
            if (value < PAGINATION_STEP) return;
            getDataByE2E('books:LoadMore').should('be.visible');
         });
   });

   it('Book page working', () => {
      cy.visit(BASE_URL);
      getDataByE2E('search:Input').type(INPUT_TEXT);
      getDataByE2E('search:Button').click();
      getDataByE2E('books:List')
         .children()
         .first()
         .click()
         .then((card) => {
            // 0th element is an image
            const category = card.children().eq(1).text();
            const title = card.children().eq(2).text();
            const authors = card.children().eq(3).text();

            getDataByE2E('book:Categories').should('have.text', category);
            getDataByE2E('book:Title').should('have.text', title);
            getDataByE2E('book:Authors').should('have.text', authors);

            getDataByE2E('book:Description').should('be.visible');

            getDataByE2E('book:Back').click();

            getDataByE2E('books:List').should('be.visible');
         });
   });

   it('Search books with category', () => {
      cy.visit(BASE_URL);
      getDataByE2E('search:Input').type(INPUT_TEXT);

      getDataByE2E('search:Category').select(CATEGORY);
      getDataByE2E('search:Button').click();
      getDataByE2E('books:List')
         .children()
         .first()
         .children()
         .eq(1)
         .should('have.text', capitalizeFirstLetter(CATEGORY));
   });

   it('Check books page loaders', () => {
      cy.visit(BASE_URL);
      getDataByE2E('books:cap').should('be.visible');
      getDataByE2E('search:Input').type(BAD_INPUT_TEXT);
      getDataByE2E('search:Button').click();
      getDataByE2E('books:notFound').should('be.visible');
   });
});
