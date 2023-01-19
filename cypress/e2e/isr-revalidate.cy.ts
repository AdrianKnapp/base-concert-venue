import { generateNewBand } from "@/__tests__/__mocks__/fakeData/newBand";
import { generateNewShow } from "@/__tests__/__mocks__/fakeData/newShow";
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

  it("should load refreshed page from cache after new show is added", () => {
    // check if show is not on page
    cy.task("db:reset").visit("/shows");
    cy.get("h2")
      .contains(/avalanche of cheese/i)
      .should("not.exist");

    // create show
    const showId = generateRandomId();
    const newShow = generateNewShow(showId);
    const secret = Cypress.env("REVALIDATION_SECRET");
    cy.request("POST", `api/shows?secret=${secret}`, {
      newShow,
    }).then((res) => {
      expect(res.body.revalidated).to.equal(true);
    });

    // check if show exist
    cy.reload();
    cy.get("h2")
      .contains(/avalanche of cheese/i)
      .should("exist");

    // Reset ISR cache
    cy.resetDbAndIsrCache();
  });
});

export {};
