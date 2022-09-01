import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test("Displays reservations and 'purchase more' button when reservations exist", async () => {
  render(<UserReservations userId={1} />);

  const button = await screen.findByText(/purchase more tickets/i);

  expect(button).toBeInTheDocument();
});
