describe("ISR tests for /bands page", () => {
  it("skips client-side bundle, confirming data from ISR cache", () => {
    cy.request("/bands")
      .its("body")
      .then((html) => {
        const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");

        cy.document().then((doc) => {
          doc.write(staticHtml);
        });
      });

    cy.get("div").contains(/The Blue Face Society/i);
  });
});

export {};
