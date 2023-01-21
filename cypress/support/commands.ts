import "@testing-library/cypress/add-commands";

Cypress.Commands.add("resetDbAndIsrCache", () => {
  cy.task("db:reset");
  const secret = Cypress.env("REVALIDATION_SECRET");
  cy.request("GET", `/api/revalidate?secret=${secret}`);
});

Cypress.Commands.add(
  "signIn",
  (
    email = Cypress.env("TEST_USER_EMAIL"),
    password = Cypress.env("TEST_PASSWORD")
  ) => {
    cy.visit("/auth/signin");

    cy.get("#email").clear().type(email);
    cy.get("#password").clear().type(password);

    cy.get("main").within(() => {
      cy.get("button")
        .contains(/sign in/i)
        .click();
    });

    cy.contains(/welcome/i);
  }
);
