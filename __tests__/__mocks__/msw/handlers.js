import { rest } from "msw";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { fakeUserReservations } from "@/__tests__/__mocks__/fakeData/userReservations";

export const handlers = [
  rest.get(
    "http://localhost:3000/api/shows/:showId",
    async (request, response, context) => {
      const { fakeShows } = await readFakeData();
      const { showId } = request.params;

      // index / showId = 0 has seats available in fake data
      // index / showId = 1 has NO seats available
      return response(
        context.json({
          show: fakeShows[Number(showId)],
        })
      );
    }
  ),
  rest.get(
    "http://localhost:3000/api/users/:userId/reservations",
    async (request, response, context) => {
      const { userId } = request.params;

      return response(
        context.json({
          userReservations: Number(userId) === 1 ? fakeUserReservations : [],
        })
      );
    }
  ),
];
