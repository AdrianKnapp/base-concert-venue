describe("auth flow", () => {
  const userEmail = Cypress.env("TEST_USER_EMAIL");
  const userPassword = Cypress.env("TEST_PASSWORD");

  const submitForm = () => {
    cy.get("main").within(() => {
      cy.get("button")
        .contains(/sign in/i)
        .click();
    });
  };

  const fillLogInFields = (
    email = userEmail as string,
    password = userPassword as string
  ) => {
    cy.get("#email").clear().type(email);
    cy.get("#password").clear().type(password);
  };

  it("runs auth flow for successful login to protected reservations page", () => {
    // visit reservations page
    cy.task("db:reset").visit("/reservations/0");

    // check for sign in form
    cy.contains(/sign in to your account/i);

    // check that there is no option to purchase tickets
    cy.contains(/purchase/i).should("not.exist");

    // enter valid sign-in credentials
    fillLogInFields();

    // submit the form
    submitForm();

    // check for purchase button and band name
    cy.contains(/purchase/i);
    cy.contains(/the wandering bunnies/i);

    // check for email and sign-out button on navbar
    cy.contains(userEmail);
    cy.contains(/sign out/i);

    // check that sign in button doesn't exist
    cy.contains(/sign in/i).should("not.exist");
  });

  it("runs auth flow for /user page", () => {
    // visit user page
    cy.visit("/user");

    // check for sign in page
    cy.contains(/sign in to your account/i);

    // fail login
    fillLogInFields(userEmail, "wrong password");
    submitForm();

    // check for error message
    cy.contains(/sign in failed/i);

    // check for no protected info
    cy.contains(/welcome test@test.test/i).should("not.exist");
    cy.contains(/your tickets/i).should("not.exist");

    // check for sign in correctly
    fillLogInFields();
    submitForm();

    // check nav bar for user email and sign out button
    cy.get("button").contains(userEmail);
    cy.get("button").contains(/sign out/i);
    cy.get("button")
      .contains(/sign in/i)
      .should("not.exist");

    // check for protected info
    cy.contains(/welcome test@test.test/i);
    cy.contains(/your tickets/i);
  });
});

export {};
