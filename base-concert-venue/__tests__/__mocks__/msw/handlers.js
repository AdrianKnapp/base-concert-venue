import { rest } from "msw";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { fakeUserReservations } from "@/__tests__/__mocks__/fakeData/userReservations";

export const handlers = [
  rest.get(
    "http://localhost:3000/api/shows/:showId",
    async (request, response, context) => {
      const { fakeShows } = await readFakeData();
      return response(
        context.json({
          show: fakeShows[0],
        })
      );
    }
  ),
  rest.get(
    "http://localhost:3000/api/users/:userId/reservations",
    async (request, response, context) =>
      response(
        context.json({
          userReservations: fakeUserReservations,
        })
      )
  ),
];
