import { generateNewReservation } from "@/__tests__/__mocks__/fakeData/newReservation";
import { generateRandomId } from "@/lib/features/reservations/utils";

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30 * ONE_SECOND;

describe("swr revalidation", () => {
  it("should refresh the shows page after 30 seconds", () => {
    cy.clock();
    cy.task("db:reset").visit("/shows");

    cy.findAllByText(/sold out/i).should("have.length", 1);

    const newReservation = generateNewReservation({
      reservationId: generateRandomId(),
      showId: 0,
      seatCount: 10,
    });

    cy.task("addReservation", newReservation);

    cy.tick(ONE_SECOND);
    cy.findAllByText(/sold out/i).should("have.length", 1);

    cy.tick(THIRTY_SECONDS);
    cy.findAllByText(/sold out/i).should("have.length", 2);
  });

  it("should show correct ticket value after buy one", () => {
    cy.clock();
    cy.task("db:reset").visit("/reservations/0");

    // login
    cy.findByRole("main").within(() => {
      cy.findByRole("button", { name: /sign in/i }).click();
    });

    const newReservation = generateNewReservation({
      reservationId: generateRandomId(),
      showId: 0,
      seatCount: 2,
    });
    cy.task("addReservation", newReservation);

    cy.tick(ONE_SECOND);
    cy.get("h2").contains(/10 seats left/i);

    cy.tick(THIRTY_SECONDS);
    cy.get("h2").contains(/8 seats left/i);
  });
});

export default {};
