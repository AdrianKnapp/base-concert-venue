import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test("Displays reservations and 'purchase more' button when reservations exist", async () => {
  render(<UserReservations userId={1} />);

  const button = await screen.findByText(/purchase more tickets/i);
  expect(button).toBeInTheDocument();
});

test("Displays no reservations and 'purchase' button when no reservations exist", async () => {
  render(<UserReservations userId={0} />);

  const buttonPurchaseTickets = await screen.findByRole("button", {
    name: /purchase tickets/i,
  });
  expect(buttonPurchaseTickets).toBeInTheDocument();

  const yourTicketsHeading = screen.queryByRole("heading", {
    name: /your tickets/i,
  });
  expect(yourTicketsHeading).not.toBeInTheDocument();
});
