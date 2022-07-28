import { el } from "./elements";
import toast from "../../components/toast";
import alertfieldForm from "../../components/alert";

class SignupPage {
  constructor() {
    this.toast = toast;
    this.alertfieldForm = alertfieldForm;
  }

  go() {
    cy.visit("/signup");
  }

  form(dadosCadastro) {
    cy.get(el.name).type(dadosCadastro.name);
    cy.get(el.email).type(dadosCadastro.email, {
      force: true,
    });
    cy.get(el.password).type(dadosCadastro.password, {
      force: true,
    });
  }

  submit() {
    cy.contains(el.signupButton).click();
  }

  removeUser(dadosCadastro) {
    cy.task("removeUser", dadosCadastro.email).then(function (result) {
      console.log(result);
    });
  }

  insertUser(dadosCadastro) {
    cy.request("POST", "http://localhost:3333/users", dadosCadastro).then(
      function (response) {
        expect(response.status).to.eq(200);
      }
    );
  }

  // alertHaveText(expecteText) {
  //   cy.contains('small[class="alert-error"]', expecteText).should('be.visible')
  // }
  
}

export default new SignupPage();
