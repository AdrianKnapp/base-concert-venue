import { generateNewBand } from "@/__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "@/lib/features/reservations/utils";

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

  it("resets the db", () => {
    cy.task("db:reset");
  });

  it("displays correct band name for band route that existed at build time", () => {
    cy.task("db:reset").visit("/bands/1");
    cy.get("h2")
      .first()
      .contains(/shamrock pete/i);
  });

  it("displays correct error message when band is not found", () => {
    cy.task("db:reset").visit("/bands/12345");
    cy.get("h2")
      .first()
      .contains(/error: band not found/i);
  });

  it("displays name for band that was not present at build time", () => {
    const bandId = generateRandomId();
    const newBand = generateNewBand(bandId);
    cy.task("db:reset").task("addBand", newBand).visit(`/bands/${bandId}`);
    cy.get("h2")
      .first()
      .contains(/avalanche of cheese/i);
  });
});

export {};
