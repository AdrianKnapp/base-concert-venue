describe("ISR tests for /shows page", () => {
  it("skips client-side bundle, confirming data from ISR cache", () => {
    cy.request("/shows")
      .its("body")
      .then((html) => {
        // remove the scripts, so they don't start automatically
        const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
        cy.document().then((doc) => {
          doc.write(staticHtml);
        });
      });

    cy.get("div").contains(/2022 sep 1[234]/i);
  });
});

export {};
