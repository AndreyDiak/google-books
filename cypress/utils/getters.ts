export const getDataByE2E = (name: string) => cy.get(`[data-e2e="${name}"]`);

export const getDataByClassName = (name: string) => cy.get(`.${name}`);
