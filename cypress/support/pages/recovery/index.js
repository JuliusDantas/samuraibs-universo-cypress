import { el } from "./elements";
import toast from "../../components/toast";
import alertfieldForm from "../../components/alert";

class recoveryPage {

    constructor() {
        this.toast = toast;
        this.alertfieldForm = alertfieldForm;
      }
    
      go() {
        cy.visit("/forgot-password");
      }

      removeUser(dadosCadastro) {
        cy.task("removeUser", dadosCadastro.email).then(function (result) {
          console.log(result);
        });
      }

      insertUser(dadosCadastro) {
        cy.request("POST", "http://localhost:3333/users", dadosCadastro).then(
          function (response) {
            expect(response.statusCode).to.equal(200);
          }
        );
      }

      form(email) {
        cy.get(el.email)
          .clear()
          .type(email) 
      }

      form2(dadosCadastro) {
        cy.get(el.email).type(dadosCadastro.email) 
      }

      submit() {
        // cy.contains(el.signupButton).click();
        cy.get(el.signupButton2).should('have.text', 'Recuperar').click();
      }
    
}

export default new recoveryPage();