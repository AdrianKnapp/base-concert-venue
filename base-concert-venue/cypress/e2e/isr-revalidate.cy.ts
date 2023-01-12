import { generateNewBand } from "@/__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "@/lib/features/reservations/utils";

describe("ISR Revalidation", () => {
  it("should load refreshed page from cache after new band is added", () => {
    // check that new band is not on page
    cy.task("db:reset").visit("/bands");
    cy.get("h2")
      .contains(/avalanche of cheese/i)
      .should("not.exist");

    // add new band via post request to api
    const bandId = generateRandomId();
    const newBand = generateNewBand(bandId);
    const secret = Cypress.env("REVALIDATION_SECRET");

    cy.request("POST", `/api/bands?secret=${secret}`, { newBand }).then(
      (res) => {
        expect(res.body.revalidated).to.equal(true);
      }
    );

    // reload page; new band should appear;
    cy.reload();
    cy.get("h2")
      .contains(/avalanche of cheese/i)
      .should("exist");

    // Clear ISR cache to initial db conditions
    cy.resetDbAndIsrCache();
  });
});

export {};
