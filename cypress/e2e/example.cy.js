describe("TODO List", () => {
  it("shows the TODOs component", () => {
    cy.visit("/");
    cy.contains("h1", "todos");
  });
});
