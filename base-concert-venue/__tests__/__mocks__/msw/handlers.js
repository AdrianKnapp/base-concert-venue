import { rest } from "msw";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";

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
];
