describe("Routes", () => {
  it("displays correct heading when navigation to shows route", () => {
    cy.visit("/");
    cy.get("button").contains(/shows/i).click();
    cy.get("h2")
      .first()
      .contains(/upcoming Shows/i);
  });

  it("displays correct heading when navigation to bands route", () => {
    cy.visit("/");
    cy.get("button").contains(/bands/i).click();
    cy.get("h2")
      .first()
      .contains(/our illustrious performers/i);
  });
});

export {};
