import {el} from './elements'

class Toast {
    shouldHaveText(expecteText) {
    cy.get(el.toast)
      .should("be.visible")
      .find("p")
      .should("have.text", expecteText);
  }
  
}

export default new Toast();
