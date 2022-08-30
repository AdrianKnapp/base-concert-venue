import { render, screen } from "@testing-library/react";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import BandComponent from "@/pages/bands/[bandId]";

test("band component displays correct band information", async () => {
  const { fakeBands } = await readFakeData();

  render(<BandComponent band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });

  expect(heading).toBeInTheDocument();
});

test("band component displays the correct error information", () => {
  render(<BandComponent band={null} error="Error 404 - Not Found" />);

  const headingError = screen.getByRole("heading", {
    name: /error 404/i,
  });

  expect(headingError).toBeInTheDocument();
});
