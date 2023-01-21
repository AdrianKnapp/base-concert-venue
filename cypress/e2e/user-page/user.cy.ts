describe("user page", () => {
  it("test purchase more tickets", () => {
    cy.task("db:reset").signIn();

    cy.visit("/user");

    cy.contains(/purchase more tickets/i).click();

    cy.contains(/upcoming shows/i);
  });
});

export {};
