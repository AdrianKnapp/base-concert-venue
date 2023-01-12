/* eslint-disable @typescript-eslint/no-namespace */
// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      resetDbAndIsrCache: () => void;
    }
  }
}

export default global;
