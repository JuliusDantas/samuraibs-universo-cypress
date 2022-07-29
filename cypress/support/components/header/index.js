import { el } from "./elements";

class Header {
  usertLogedIn(expecteText) {
    cy.get(el.user_logedin, { timeout: 7000 })
      .should("be.visible")
      .should("have.text", expecteText);
  }
}

export default new Header();
